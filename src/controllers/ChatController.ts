import ChatAPI from '../api/ChatAPI';
import Store from '../store/Store';
import { ChatType } from '../modules/chats/components/lastMessage/types';
import MessagesController from './MessagesController';
import Validator from '../utils/validator';
import getFormValues from '../helpers/getFormValues';
import escapeHTML from '../helpers/escapeHTML';
import { NotificationTypeEnum } from '../components/notification/types';
import NotificationController from './NotificationController';

const chatApi = new ChatAPI();
export default class ChatController {
  public static async getChats() {
    Store.set('chats.isLoading', true);

    await chatApi.request()
      .then((data) => {
        const chats = data as ChatType[];
        Store.set('chats.data', chats);

        if (!chats) {
          throw new Error('Data is undefined');
        }

        chats.forEach(async (chat: ChatType) => {
          const token = await this.getToken(chat.id);
          if (!token) {
            throw new Error('Token is undefined');
          }
          await MessagesController.connect(chat.id, token);
        });
      })
      .catch((err) => {
        NotificationController.createNotification({
          type: NotificationTypeEnum.Error,
          message: err,
        });
      });

    Store.set('chats.isLoading', true);
  }

  static getToken(id: number) {
    return chatApi.getToken(id)
      .catch((err) => {
        NotificationController.createNotification({
          type: NotificationTypeEnum.Error,
          message: err,
        });
      });
  }

  static selectChat(id: number) {
    Store.set('selectedChat', id);
  }

  static selectUser(id: number | null) {
    Store.set('selectedUser', id);
  }

  static async getUsersSelectedChat(id: number) {
    const data = await chatApi.getUsersSelectedChat(id)
      .catch((err) => {
        NotificationController.createNotification({
          type: NotificationTypeEnum.Error,
          message: err,
        });
      });
    Store.set('usersSelectedChat', data);
  }

  static sendMessage(formElement: HTMLFormElement) {
    const isValidForm = Validator.validateForm(formElement);
    if (!isValidForm) return;

    const { message } = getFormValues(formElement);
    const { selectedChat } = Store.getState();
    if (!selectedChat) {
      throw new Error('Chat is not selected');
    }
    MessagesController.sendMessage(selectedChat, message);
  }

  static resetForm(formElement: HTMLFormElement) {
    formElement.reset();
  }

  static async createChat(formElement: HTMLFormElement) {
    const isValidForm = Validator.validateForm(formElement);
    if (!isValidForm) {
      throw new Error();
    }
    const { title } = getFormValues(formElement);
    await chatApi.create({ title: escapeHTML(title) })
      .then(() => {
        ChatController.toggleModalCreateChat(false);

        this.getChats();
      })
      .catch((err) => {
        NotificationController.createNotification({
          type: NotificationTypeEnum.Error,
          message: err,
        });
      });
  }

  static toggleModalCreateChat(value: boolean) {
    Store.set('isOpenModalCreateChat', value);
  }

  static toggleModalAddUser(value: boolean) {
    Store.set('isOpenModalAddUser', value);
  }

  static toggleModalRemoveUser(value: boolean) {
    Store.set('isOpenModalRemoveUser', value);
  }

  static toggleModalRemoveChat(value: boolean) {
    Store.set('isOpenModalRemoveChat', value);
  }

  public static async addUserToChat(formElement: HTMLFormElement) {
    const input = formElement.querySelector('#autocomplete-add-user > label > input');

    const id: number = Number((input as HTMLInputElement).name);

    const chatId = Store.getState().selectedChat;

    if (chatId === null) {
      throw new Error('Chat not selected');
    }
    await chatApi.addUser({
      users: [id],
      chatId,
    })
      .then(() => {
        this.getUsersSelectedChat(chatId);
      })
      .catch((err) => {
        NotificationController.createNotification({
          type: NotificationTypeEnum.Error,
          message: err,
        });
      });
  }

  static async removeUserFromChat() {
    const {
      selectedChat,
      selectedUser,
    } = Store.getState();
    if (selectedChat === null) {
      throw new Error('Chat not selected');
    }
    if (selectedUser === null) {
      throw new Error('User not selected');
    }
    await chatApi.removeUserFromChat({
      users: [selectedUser],
      chatId: selectedChat,
    })
      .then(() => {
        this.getUsersSelectedChat(selectedChat);
      })
      .catch((err) => {
        NotificationController.createNotification({
          type: NotificationTypeEnum.Error,
          message: err,
        });
      });
  }

  static async removeChat() {
    const { selectedChat } = Store.getState();
    if (!selectedChat) {
      throw new Error('Chat not selected');
    }
    await chatApi.removeChat(selectedChat)
      .then(() => {
        Store.set('selectedChat', null);
      })
      .catch((err) => {
        NotificationController.createNotification({
          type: NotificationTypeEnum.Error,
          message: err,
        });
      });
  }
}

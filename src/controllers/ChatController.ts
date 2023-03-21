import ChatAPI from '../api/ChatAPI';
import Store from '../store/Store';
import { ChatType } from '../modules/chats/components/lastMessage/types';
import MessagesController from './MessagesController';
import Validator from '../utils/validator';
import getFormValues from '../helpers/getFormValues';
import escapeHTML from '../helpers/escapeHTML';

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
      });

    Store.set('chats.isLoading', true);
  }

  static getToken(id: number) {
    return chatApi.getToken(id);
  }

  static selectChat(id: number) {
    Store.set('selectedChat', id);
  }

  static selectUser(id: number | null) {
    Store.set('selectedUser', id);
  }

  static async getUsersSelectedChat(id: number) {
    const data = await chatApi.getUsersSelectedChat(id);
    Store.set('usersSelectedChat', data);
  }

  static sendMessage(formElement: HTMLFormElement) {
    const isValidForm = Validator.validateForm(formElement);
    if (!isValidForm) {
      throw new Error('Invalid form');
    }

    const { message } = getFormValues(formElement);
    const { selectedChat } = Store.getState();
    if (!selectedChat) {
      throw new Error('Chat is not selected');
    }
    MessagesController.sendMessage(selectedChat, message);
  }

  static async createChat(formElement: HTMLFormElement) {
    const isValidForm = Validator.validateForm(formElement);
    if (!isValidForm) {
      throw new Error();
    }
    const { title } = getFormValues(formElement);
    await chatApi.create({ title: escapeHTML(title) });

    await this.getChats();
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

  public static async addUserToChat(formElement: HTMLFormElement) {
    const input = formElement.querySelector('#autocomplete-add-user > label > input');

    const id: number = Number((input as HTMLInputElement).name);

    const chatId = Store.getState().selectedChat;

    if (chatId === null) {
      throw new Error('Chat not selected');
    }
    await chatApi.addUser({ users: [id], chatId });
  }

  static removeUserFromChat() {
    const { selectedChat, selectedUser } = Store.getState();
    if (selectedChat === null) {
      throw new Error('Chat not selected');
    }
    if (selectedUser === null) {
      throw new Error('User not selected');
    }
    chatApi.removeUserFromChat({ users: [selectedUser], chatId: selectedChat });
  }
}

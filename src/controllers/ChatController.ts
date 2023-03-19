import dialog from './dialog';
import ChatAPI from '../api/ChatAPI';
import { ChatByUserId } from '../types/ChatTypes';
import Store from '../store/Store';
import { ChatType } from '../modules/chats/components/lastMessage/types';
import MessagesController from './MessagesController';
import Validator from '../utils/validator';
import getFormValues from '../helpers/getFormValues';

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
          const { token } = await this.getToken(chat.id);
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

  static createChat(title: string) {
    // Сначала функция должна создать модальное окно
    // chatApi.create({ title });
  }
}

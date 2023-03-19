import dialog from './dialog';
import ChatAPI from '../api/chat/ChatAPI';
import { ChatByUserId } from '../types/ChatTypes';
import Store from '../store/Store';

const chatApi = new ChatAPI();
export default class ChatController {
  public static async getChats() {
    Store.set('chats.isLoading', true);

    await chatApi.request()
      .then((data) => Store.set('chats.data', data));

    Store.set('chats.isLoading', true);
  }

  static getToken(id: number) {
    return ChatAPI.getToken(id);
  }

  static selectChat(id: number) {
    Store.set('selectedChat', id);
  }

  static sendMessage(form: { [key: string]: string }) {
    console.log(form);
  }

  static getChatByUserId(id: number) {
    const chatByUserId: { [key: number]: ChatByUserId[] } = dialog;

    return chatByUserId[id];
  }
}

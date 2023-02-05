import dialog from './dialog';

export interface ChatByUserId {
  id: number;
  text: string;
  date: string;
  userId: number | null;

  files: File[];
}

export default class ChatController {
  static sendMessage(form: { [key: string]: string }) {
    console.log(form);
  }

  static getChatByUserId(id: number) {
    const chatByUserId: { [key: number]: ChatByUserId[] } = dialog;

    return chatByUserId[id];
  }
}

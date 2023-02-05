export interface ChatByUserId {
  id: number;
  text: string;
  date: string;
  userId: number | null;

  files: File[];
}

export default class ChatController {
  static sendMessage() {
    console.log('send message');
  }

  static getChatByUserId(id: number) {
    const chatByUserId: { [key: number]: ChatByUserId[] } = {
      44: [
        {
          id: 1,
          text: 'Привет. Как дела?',
          date: '10:34',
          userId: 44,
          files: [],
        },
        {
          id: 2,
          text: 'Хорошо, как у тебя?',
          date: '10:35',
          userId: null,
          files: [],
        },
        {
          id: 3,
          text: 'У меня тоже отлично. Хорошего дня!',
          date: '10:36',
          userId: 44,
          files: [],
        },
        {
          id: 4,
          text: 'Пока',
          date: '10:37',
          userId: null,
          files: [],
        },
      ],
      23: [],
      17: [],
    };

    return chatByUserId[id];
  }
}

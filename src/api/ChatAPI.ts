import BaseAPI from './BaseAPI';

export default class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  async create(data: { title: string }) {
    try {
      return await this.http.post('', {
        data,
        headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      });
    } catch {
      throw new Error('Failed to create chat');
    }
  }

  async request() {
    // Здесь уже не нужно писать полный путь /api/v1/chats/
    return this.http.get('', {});
  }

  async getToken(id: number) {
    try {
      return await this.http.post(`/token/${id}`, {
        headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      });
    } catch {
      throw new Error('Method getToken failed');
    }
  }

  update = undefined;

  delete = undefined;
}

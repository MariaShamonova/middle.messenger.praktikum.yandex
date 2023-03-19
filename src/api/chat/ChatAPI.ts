import BaseAPI from '../BaseAPI';

export default class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  async create() {
    return this.http.post('', {
      data: {
        title: 'string', headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      },
    });
  }

  async request() {
    // Здесь уже не нужно писать полный путь /api/v1/chats/
    return this.http.get('', {});
  }

  async getToken(id: number) {
    try {
      return await this.http.get(`/token/${id}`, {
        headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      });
    } catch {
      throw new Error('Method /logout failed');
    }
  }

  update = undefined;

  delete = undefined;
}

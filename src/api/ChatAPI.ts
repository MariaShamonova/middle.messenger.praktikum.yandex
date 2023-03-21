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
      const response = await this.http.post(`/token/${id}`, {
        headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      });
      return (response as { token: string }).token;
    } catch {
      throw new Error(`Failed to get token by chat's id: ${id}`);
    }
  }

  async addUser(data: { users: number[], chatId: number }) {
    try {
      console.log(data);
      return await this.http.post('/users', {
        data,
        headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      });
    } catch {
      throw new Error('Failed to add user');
    }
  }

  async getUsersSelectedChat(id: number) {
    try {
      return await this.http.get(`/${id}/users`, {
        headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      });
    } catch {
      throw new Error(`Failed to get users for chat's id: ${id}`);
    }
  }

  async removeUserFromChat(data: { users: number[], chatId: number }) {
    try {
      return await this.http.delete('/users', {
        data,
        headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      });
    } catch {
      throw new Error('Failed to delete user');
    }
  }

  update = undefined;

  delete = undefined;
}

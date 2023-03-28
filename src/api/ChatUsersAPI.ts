import BaseAPI from './BaseAPI';

export default class ChatUsersAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  async request(data: { login: string }) {
    try {
      return await this.http.post('/search', {
        data,
        headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      });
    } catch (err) {
      throw new Error(JSON.stringify(err));
    }
  }

  create = undefined;

  delete = undefined;

  update = undefined;
}

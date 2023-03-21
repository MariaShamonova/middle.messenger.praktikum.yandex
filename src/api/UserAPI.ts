import BaseAPI from './BaseAPI';

export default class UserAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  async request() {
    try {
      return await this.http.get('/user', {
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

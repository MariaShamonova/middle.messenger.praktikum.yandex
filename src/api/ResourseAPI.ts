import BaseAPI from './BaseAPI';

export default class ResourseAPI extends BaseAPI {
  constructor() {
    super('/resources');
  }

  async request(path: string) {
    try {
      return await this.http.get(`/${path}`, {
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

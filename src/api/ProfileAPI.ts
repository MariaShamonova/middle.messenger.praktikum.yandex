import BaseAPI from './BaseAPI';
import { UserProfileType } from './AuthAPI';

export default class ProfileAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  request = undefined;

  create = undefined;

  delete = undefined;

  update = undefined;

  async updateProfile(data: UserProfileType) {
    try {
      return await this.http.put('/profile', {
        data,
        headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async updatePassword(data: UserProfileType) {
    try {
      return await this.http.put('/password', {
        data,
        headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateAvatar(data: UserProfileType) {
    try {
      console.log(data);
      return await this.http.put('/profile/avatar', {
        data,
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}

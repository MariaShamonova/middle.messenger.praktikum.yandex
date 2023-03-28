import BaseAPI from './BaseAPI';
import { UserProfileType } from './AuthAPI';

export interface FormPasswordType {
  newPassword: string;
  oldPassword: string;
}

export interface FormUserDataType extends Omit<UserProfileType, 'password'> {
}

export default class ProfileAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  request = undefined;

  create = undefined;

  delete = undefined;

  update = undefined;

  async updateProfile(data: FormUserDataType) {
    try {
      return await this.http.put('/profile', {
        data,
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      throw new Error('Failed update profile data');
    }
  }

  async updatePassword(data: FormPasswordType) {
    try {
      return await this.http.put('/password', {
        data,
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      throw new Error(JSON.stringify(err));
    }
  }

  async updateAvatar(data: FormData) {
    try {
      console.log(data);
      return await this.http.put('/profile/avatar', {
        data,
      });
    } catch (err) {
      throw new Error(JSON.stringify(err));
    }
  }
}

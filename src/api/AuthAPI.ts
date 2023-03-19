import BaseAPI from './BaseAPI';

interface LoginFormModel {
  email: string;
  password: string;
}

export interface UserProfileType {
  first_name: string;
  second_name: string;
  display_name: string;
  email: string;
  password: string;
  phone: string;
}

export default class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  async signin(data: LoginFormModel) {
    try {
      return await this.http.post('/signin', {
        data,
        headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async signup(data: UserProfileType) {
    try {
      return await this.http.post('/signup', {
        data,

        headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      });
    } catch {
      throw new Error('Method /logout failed');
    }
  }

  async logout() {
    try {
      return await this.http.post('/logout', {
        headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      });
    } catch {
      throw new Error('Method /logout failed');
    }
  }

  request = undefined;

  create = undefined;

  delete = undefined;

  update = undefined;
}

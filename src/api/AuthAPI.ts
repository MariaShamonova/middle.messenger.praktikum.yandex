import BaseAPI from './BaseAPI';

interface LoginFormModel {
  login: string;
  password: string;
}

export interface UserRegistrationType {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface UserProfileType extends UserRegistrationType {

  display_name: string;
}

export interface UserResponseType extends UserProfileType {
  id: number;
  avatar: string;
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
      throw new Error(JSON.stringify(err));
    }
  }

  async signup(data: UserRegistrationType) {
    try {
      return await this.http.post('/signup', {
        data,

        headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      });
    } catch (err) {
      throw new Error(JSON.stringify(err));
    }
  }

  async logout() {
    try {
      return await this.http.post('/logout', {
        headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      });
    } catch (err) {
      throw new Error(JSON.stringify(err));
    }
  }

  request = undefined;

  create = undefined;

  delete = undefined;

  update = undefined;
}

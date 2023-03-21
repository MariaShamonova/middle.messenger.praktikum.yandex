import UserAPI from '../api/UserAPI';
import Store from '../store/Store';

const userApi = new UserAPI();

export default class UserController {
  public static async getUser() {
    try {
      Store.set('user.isLoading', true);

      const user = await userApi.request();
      Store.set('user.data', user);

      Store.set('user.isLoading', false);

      return user;
    } catch (err) {
      throw new Error(JSON.stringify(err));
    }
  }
}

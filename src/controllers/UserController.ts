import UserAPI from '../api/UserAPI';
import Store from '../store/Store';
import Validator from '../utils/validator';
import getFormValues from '../utils/getFormValues';

const userApi = new UserAPI();

export default class UserController {
  public static async getUser() {
    try {
      // Запускаем крутилку
      Store.set('user.isLoading', true);

      const user = await userApi.request();
      Store.set('user.data', user);

      // Останавливаем крутилку
      Store.set('user.isLoading', false);

      return user;
    } catch (error) {
      // Логика обработки ошибок
      // Store.set('user.error', error);
      throw new Error(error);
    }
  }

  public static async changeUserProfile(form: HTMLFormElement) {
    try {
      // Запускаем крутилку
      Store.set('user.isLoading', true);
      const isValidForm = Validator.validateForm(form);
      if (!isValidForm) {
        throw new Error();
      }
      const data = getFormValues(form);
      const user = await userApi.updateProfile(data);
      console.log(data);
      Store.set('user.data', user);

      // Останавливаем крутилку
      Store.set('user.isLoading', false);

      return user;
    } catch (error) {
      // Логика обработки ошибок
      // Store.set('user.error', error);
      throw new Error(error);
    }
  }

  public static async changeUserPassword(form: HTMLFormElement) {
    try {
      // Запускаем крутилку
      Store.set('user.isLoading', true);

      const isValidForm = Validator.validateForm(form);
      if (!isValidForm) {
        throw new Error();
      }

      const data = getFormValues(form);

      const user = await userApi.updatePassword(data);
      Store.set('user.data', user);

      // Останавливаем крутилку
      Store.set('user.isLoading', false);

      return user;
    } catch (error) {
      // Логика обработки ошибок
      // Store.set('user.error', error);
      throw new Error(error);
    }
  }

  public static async changeUserAvatar() {
    try {
      // Запускаем крутилку
      Store.set('user.isLoading', true);

      const user = await userApi.updateAvatar({});
      // Store.set('user.data', user);

      // Останавливаем крутилку
      Store.set('user.isLoading', false);

      return user;
    } catch (error) {
      // Логика обработки ошибок
      // Store.set('user.error', error);
      throw new Error(error);
    }
  }
}

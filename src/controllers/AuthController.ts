import AuthAPI from '../api/AuthAPI';
import Router from '../router/Router';
import Validator from '../utils/validator';
import getFormValues from '../utils/getFormValues';
import Store from '../store/Store';

const authApi = new AuthAPI();

export default class AuthController {
  public static async signin(formElement: HTMLFormElement) {
    try {
      // Запускаем крутилку

      const isValidForm = Validator.validateForm(formElement);
      if (!isValidForm) {
        throw new Error();
      }
      const data = getFormValues(formElement);
      await authApi.signin(data);
      await Router.go('/');

      // Останавливаем крутилку
    } catch (error) {
      // Логика обработки ошибок
      console.log(error);
    }
  }

  public static async signup(formElement: HTMLFormElement) {
    try {
      // Запускаем крутилку

      const isValidForm = Validator.validateForm(formElement);
      if (!isValidForm) {
        throw new Error();
      }
      const { confirm_password, ...data } = getFormValues(formElement);

      await authApi.signup(data);
      await Router.go('/');

      // Останавливаем крутилку
    } catch (error) {
      // Логика обработки ошибок
      console.log(error);
    }
  }

  public static async logout() {
    try {
      // Запускаем крутилку
      Store.set('user.isLoading', true);

      await authApi.logout();
      Store.set('user.data', undefined);
      Store.set('user.error', '');
      await Router.go('/login');

      // Останавливаем крутилку
      Store.set('user.isLoading', false);
    } catch (error) {
      // Логика обработки ошибок
      console.log(error);
    }
  }
}

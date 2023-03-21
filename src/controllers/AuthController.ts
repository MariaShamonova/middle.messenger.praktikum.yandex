import AuthAPI from '../api/AuthAPI';
import Router from '../router/Router';
import Validator from '../utils/validator';
import getFormValues from '../helpers/getFormValues';
import Store from '../store/Store';
import escapeHTML from '../helpers/escapeHTML';

const authApi = new AuthAPI();

export default class AuthController {
  public static async signin(formElement: HTMLFormElement) {
    try {
      const isValidForm = Validator.validateForm(formElement);
      if (!isValidForm) {
        throw new Error();
      }
      const data = getFormValues(formElement);

      await authApi.signin({
        login: escapeHTML(data.login),
        password: escapeHTML(data.password),
      });
      await Router.go('/');
    } catch (error) {
      console.log(error);
    }
  }

  public static async signup(formElement: HTMLFormElement) {
    try {
      const isValidForm = Validator.validateForm(formElement);
      if (!isValidForm) {
        throw new Error();
      }
      const data = getFormValues(formElement);
      // data.first_name
      await authApi.signup({
        first_name: escapeHTML(data.first_name),
        second_name: escapeHTML(data.second_name),
        login: escapeHTML(data.login),
        email: escapeHTML(data.email),
        password: escapeHTML(data.password),
        phone: escapeHTML(data.phone),
      });
      await Router.go('/');
    } catch (error) {
      console.log(error);
    }
  }

  public static async logout() {
    try {
      Store.set('user.isLoading', true);

      await authApi.logout();

      await Router.go('/login');
      Store.set('user.data', {});
      Store.set('user.error', '');
      Store.set('user.isLoading', false);
    } catch (error) {
      console.log(error);
    }
  }

  static async goToRegistration() {
    await Router.go('/registration');
  }
}

import AuthAPI from '../api/AuthAPI';
import Router from '../router/Router';
import Validator from '../utils/validator';
import getFormValues from '../helpers/getFormValues';
import Store from '../store/Store';
import escapeHTML from '../helpers/escapeHTML';
import NotificationController from './NotificationController';
import { NotificationTypeEnum } from '../components/notification/types';

const authApi = new AuthAPI();

export default class AuthController {
  public static async signin (formElement: HTMLFormElement) {
    try {
      const isValidForm = Validator.validateForm(formElement);
      if (!isValidForm) {
        throw new Error();
      }
      const data = getFormValues(formElement);

      await authApi.signin({
        login: escapeHTML(data.login),
        password: escapeHTML(data.password),
      })
        .catch((err) => {
          NotificationController.createNotification({
            type: NotificationTypeEnum.Error,
            message: err,
          });
        });
      await Router.go('/messenger');
    } catch (error) {
      console.log(error);
    }
  }

  public static async signup (formElement: HTMLFormElement) {
    try {
      const isValidForm = Validator.validateForm(formElement);
      if (!isValidForm) {
        throw new Error();
      }
      const data = getFormValues(formElement);

      await authApi.signup({
        first_name: escapeHTML(data.first_name),
        second_name: escapeHTML(data.second_name),
        login: escapeHTML(data.login),
        email: escapeHTML(data.email),
        password: escapeHTML(data.password),
        phone: escapeHTML(data.phone),
      })
        .catch((err) => {
          NotificationController.createNotification({
            type: NotificationTypeEnum.Error,
            message: err,
          });
        });
      await Router.go('/messenger');
    } catch (error) {
      console.log(error);
    }
  }

  public static async logout () {
    try {
      Store.set('user.isLoading', true);

      await authApi.logout()
        .catch((err) => {
          NotificationController.createNotification({
            type: NotificationTypeEnum.Error,
            message: err,
          });
        });

      await Router.go('/');
      Store.set('user.data', {});
      Store.set('user.error', '');
      Store.set('user.isLoading', false);
    } catch (error) {
      console.log(error);
    }
  }

  static async goToRegistration () {
    await Router.go('/sign-up');
  }
}

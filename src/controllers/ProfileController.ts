import ProfileAPI from '../api/ProfileAPI';
import Store from '../store/Store';
import Validator from '../utils/validator';
import getFormValues from '../helpers/getFormValues';
import escapeHTML from '../helpers/escapeHTML';

const profileApi = new ProfileAPI();

export default class UserController {
  public static async changeUserProfile(form: HTMLFormElement) {
    try {
      Store.set('user.isLoading', true);

      const isValidForm = Validator.validateForm(form);
      if (!isValidForm) {
        throw new Error();
      }
      const data = getFormValues(form);
      const user = await profileApi.updateProfile({
        first_name: escapeHTML(data.first_name),
        second_name: escapeHTML(data.second_name),
        email: escapeHTML(data.email),
        login: escapeHTML(data.login),
        phone: escapeHTML(data.phone),
        display_name: escapeHTML(data.display_name),
        password: escapeHTML(data.password),
      });

      Store.set('user.data', user);
      Store.set('user.isLoading', false);

      return user;
    } catch (err) {
      throw new Error(JSON.stringify(err));
    }
  }

  public static async changeUserPassword(form: HTMLFormElement) {
    try {
      Store.set('user.isLoading', true);

      const isValidForm = Validator.validateForm(form);
      if (!isValidForm) {
        throw new Error();
      }

      const { confirmNewPassword, ...data } = getFormValues(form);

      const user = await profileApi.updatePassword({
        oldPassword: escapeHTML(data.oldPassword),
        newPassword: escapeHTML(data.newPassword),
      });
      Store.set('user.data', user);

      Store.set('user.isLoading', false);

      return user;
    } catch (err) {
      throw new Error(JSON.stringify(err));
    }
  }

  public static async changeUserAvatar(file: File) {
    try {
      Store.set('user.isLoading', true);

      const formData = new FormData();
      formData.append('avatar', file);

      const user = await profileApi.updateAvatar(formData);
      Store.set('user.data', user);

      Store.set('user.isLoading', false);

      return user;
    } catch (err) {
      throw new Error(JSON.stringify(err));
    }
  }
}

import ProfileAPI from '../api/ProfileAPI';
import Store from '../store/Store';
import Validator from '../utils/validator';
import getFormValues from '../helpers/getFormValues';

const profileApi = new ProfileAPI();

export default class UserController {
  public static async changeUserProfile(form: HTMLFormElement) {
    try {
      // Запускаем крутилку
      Store.set('user.isLoading', true);
      const isValidForm = Validator.validateForm(form);
      if (!isValidForm) {
        throw new Error();
      }
      const data = getFormValues(form);
      const user = await profileApi.updateProfile(data);
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

      const { confirmNewPassword, ...data } = getFormValues(form);

      const user = await profileApi.updatePassword(data);
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

  public static async changeUserAvatar(file: File) {
    try {
      // Запускаем крутилку
      Store.set('user.isLoading', true);
      console.log(file);

      const formData = new FormData();

      formData.append('avatar', file);
      console.log(formData.get('avatar'));
      const user = await profileApi.updateAvatar(formData);
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

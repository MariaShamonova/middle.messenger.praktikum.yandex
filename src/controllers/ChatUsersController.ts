import ChatUsersAPI from '../api/ChatUsersAPI';
import { UserProfileType } from '../api/AuthAPI';

const chatUserApi = new ChatUsersAPI();

export default class ChatUsersController {
  public static async getUserByLogin(login: string): Promise<UserProfileType[]> {
    try {
      return await chatUserApi.request({ login }) as UserProfileType[];
    } catch (err) {
      throw new Error(JSON.stringify(err));
    }
  }
}

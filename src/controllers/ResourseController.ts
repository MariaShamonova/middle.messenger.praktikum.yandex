import ResourseAPI from '../api/ResourseAPI';

const resourseApi = new ResourseAPI();

export default class ResourseController {
  public static async getAvatar(path: string) {
    try {
      return await resourseApi.request(path);
    } catch (err) {
      throw new Error(JSON.stringify(err));
    }
  }
}

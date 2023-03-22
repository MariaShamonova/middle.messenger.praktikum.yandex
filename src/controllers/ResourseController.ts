import ResourceAPI from '../api/ResourceAPI';
import NotificationController from './NotificationController';
import { NotificationTypeEnum } from '../components/notification/types';

const resourceApi = new ResourceAPI();

export default class ResourceController {
  public static async getAvatar(path: string) {
    try {
      return await resourceApi.request(path)
        .catch((err) => {
          NotificationController.createNotification({
            type: NotificationTypeEnum.Error,
            message: err,
          });
        });
    } catch (err) {
      throw new Error(JSON.stringify(err));
    }
  }
}

import { CreateNotificationType, NotificationTypeEnum } from '../components/notification/types';
import Store from '../store/Store';

export default class NotificationController {
  public static createNotification(props: CreateNotificationType) {
    console.log(props.message);
    switch (props.type) {
      case NotificationTypeEnum.Error:
        Store.set('notification.title', 'Ошибка');
        Store.set('notification.type', NotificationTypeEnum.Error);
        break;
      case NotificationTypeEnum.Success:
        Store.set('notification.title', 'Успешно');
        Store.set('notification.type', NotificationTypeEnum.Success);
        break;
      default:
        Store.set('notification.title', 'Информация');
        Store.set('notification.type', NotificationTypeEnum.Info);
    }
    Store.set('notification.message', props.message);
    Store.set('notification.isOpen', true);
    setTimeout(() => {
      Store.set('notification.isOpen', false);
    }, 1500);
  }
}

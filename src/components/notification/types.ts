export interface CreateNotificationType {
  message: string;
  type?: NotificationTypeEnum;
}

export interface NotificationPropsType extends CreateNotificationType {
  title: string;
  isOpen: boolean;
}

export enum NotificationTypeEnum {
  Error = 'error',
  Info = 'info',
  Success = 'success',
}

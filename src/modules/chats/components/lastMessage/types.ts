export enum StatusMessage {
  active = 'active',
  default = 'default',
}

export interface LastMessageProps {
  userId: number;
  active: StatusMessage;
  text: string;
  user: string;
  date: string;
  unreadMessage: string | number;
  avatarPath?: string;
  events?: { [key: string]: Function };

}

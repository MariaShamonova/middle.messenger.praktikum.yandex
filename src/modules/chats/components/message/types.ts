export enum MessageByUserType {
  my = 'my',
  default = 'default',
}

export interface MessageProps {
  text: string;
  date: string;
  user: MessageByUserType;
}

export enum StatusMessage {
  active = 'active',
  default = 'default',
}

export interface LastMessageType {
  'id': number;
  'title': string;
  'avatar': string;
  'unread_count': number;
  'last_message': {
    'user': {
      'first_name': string
      'second_name': string
      'avatar': string
      'email': string
      'login': string
      'phone': string
    },
    'time': string
    'content': string
  };
}

export interface LastMessageProps {
  message: LastMessageType;

  active: StatusMessage;
  events?: { [key: string]: Function };

}

export type ChatType = LastMessageType;

import EventBus from '../utils/EventBus';
import set from '../helpers/set';
import { ChatType } from '../modules/chats/components/lastMessage/types';
import { UserProfileType, UserResponseType } from '../api/AuthAPI';
import { Indexed } from '../types/ComponentType';
import { NotificationPropsType, NotificationTypeEnum } from '../components/notification/types';

export interface MessageResponseType {
  id: number;
  time: string;
  user_id: string;
  content: string;
  type: string;
  file: {
    id: number
    user_id: number
    path: string
    filename: string
    content_type: string
    content_size: number
    upload_date: string
  };
}

export interface State extends Indexed {
  user: {
    isLoading: boolean
    data: UserResponseType
    error: string
  };
  chats: {
    isLoading: boolean
    data: ChatType[]
    error: string
  };
  selectedChat: number | null;
  isOpenModalCreateChat: boolean;
  isOpenModalAddUser: boolean;
  isOpenModalRemoveUser: boolean;
  isOpenModalRemoveChat: boolean;
  messages: Record<string, {
    idLoading: boolean
    data: MessageResponseType[]
    error: string
  }>;
  usersSelectedChat: UserProfileType[];
  selectedUser: number | null;
  notification: NotificationPropsType;
}

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private state: State = {
    user: {
      data: {} as UserResponseType,
      error: '',
      isLoading: false,
    },
    chats: {
      data: [] as ChatType[],
      error: '',
      isLoading: false,
    },
    messages: {},
    usersSelectedChat: [],
    selectedUser: null,
    selectedChat: null,
    isOpenModalAddUser: false,
    isOpenModalCreateChat: false,
    isOpenModalRemoveUser: false,
    isOpenModalRemoveChat: false,
    notification: {
      isOpen: false,
      type: NotificationTypeEnum.Info,
      title: '',
      message: '',
    },
  };

  public getState () {
    return this.state;
  }

  public set (path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated, this.state);
  }
}

const store = new Store();
export default store;

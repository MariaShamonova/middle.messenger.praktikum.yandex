import EventBus from '../../event-bus';
import set from '../helpers/set';
import { ChatType } from '../modules/chats/components/lastMessage/types';
import { UserProfileType, UserResponseType } from '../api/AuthAPI';
import { MessageType } from '../modules/chats/components/message/Message';

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

export interface State {
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
  messages: Record<string, {
    idLoading: boolean
    data: MessageResponseType[]
    error: string
  }>;
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
    selectedChat: null,
  };

  public getState() {
    return this.state;
  }

  public set<K extends keyof State>(path: string, value: State[K]) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated, this.state);
  }
}

const store = new Store();
export default store;

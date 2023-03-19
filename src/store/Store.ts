import EventBus from '../../event-bus';
import set from '../utils/set';
import { ChatType } from '../modules/chats/components/lastMessage/types';
import { UserProfileType } from '../api/AuthAPI';

export interface State {
  user: {
    isLoading: boolean
    data: UserProfileType
    error: string
  };
  chats: {
    isLoading: boolean
    data: ChatType[]
    error: string
  };
  selectedChat: number | null;
}

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private state: State = {
    user: {
      data: {} as UserProfileType,
      error: '',
      isLoading: false,
    },
    chats: {
      data: [] as ChatType[],
      error: '',
      isLoading: false,
    },
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

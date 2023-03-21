import Block from '../utils/block';
import isEqual from '../helpers/isEqual';
import store, { StoreEvents, State } from '../store/Store';
import cloneDeep from '../helpers/cloneDeep';
import { BlockConstructable } from '../router/Route';

export default (
  mapStateToProps: (state: State) => any,
) => function (Component: typeof Block<any>) {
  let state: any;

  type Props = typeof Component;

  class WithStore extends Component {
    protected constructor(props: Props & PropsWithStore, tagName: string) {
      state = cloneDeep(mapStateToProps(store.getState()));
      super({ ...props, ...state }, tagName);
      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState());
        if (!isEqual(state, newState)) {
          this.setProps({ ...newState });
        }
        state = newState;
      });
    }
  }

  return WithStore as unknown as BlockConstructable;
};

export interface PropsWithStore {
  router: typeof store;
}

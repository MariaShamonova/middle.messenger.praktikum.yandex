import Block from '../utils/block';
import isEqual from '../helpers/isEqual';
import store, { StoreEvents, State } from '../store/Store';
import cloneDeep from '../helpers/cloneDeep';

type Indexed = {
  [key: string]: any
};
export const withStore = (mapStateToProps: (state: State) => any) => function (Component: typeof Block) {
  let state: any;
  return class extends Component {
    constructor(props: any) {
      // сохраняем начальное состояние
      state = cloneDeep(mapStateToProps(store.getState()));
      super({ ...props, ...state });
      // подписываемся на событие
      store.on(StoreEvents.Updated, () => {
        // при обновлении получаем новое состояние
        const newState = mapStateToProps(store.getState());

        // если что-то из используемых данных поменялось, обновляем компонент
        if (!isEqual(state, newState)) {
          this.setProps({ ...newState });
        }

        // не забываем сохранить новое состояние
        state = newState;
      });
    }
  };
};

import tpl from './autocomplete.hbs';
import './autocomplete.less';
import { AutocompletePropsType, AutocompleteBlockType } from './types';
import Block from '../../utils/Block';
import Input from '../input/Input';
import Menu from '../menu/Menu';
import MenuItem from '../menu/components/MenuItem';
import { MenuOptionType } from '../menu/types';
import { InputBlockType } from '../input/types';

export default class Autocomplete extends Block {
  constructor(props: AutocompletePropsType, tagName = 'div') {
    super(props, tagName);
    const self = this;

    this.children.input = new Input({
      block: InputBlockType.fill,
      placeholder: 'Введите логин пользователя',
      events: {
        async change(evn: Event) {
          const target = evn.target as HTMLInputElement;
          if (target.value) {
            const data = await self.props.getData(target.value);
            self.children.list = self.createList(data);
            self.props.isOpen = true;
          } else {
            self.props.isOpen = false;
          }
        },
      },
    });
  }

  createList(data: MenuOptionType[]) {
    const self = this;
    return new Menu({
      id: this.props.id,
      position: 'bottom',
      block: AutocompleteBlockType.fill,
      options: data.reduce((
        acc: MenuItem[],
        curr: MenuOptionType,
      ) => {
        acc.push(new MenuItem({
          option: curr,
          events: {
            click() {
              const input = document.querySelector(
                `#autocomplete-${self.props.id} > label > input`,
              );
              (input as HTMLInputElement).value = curr.title;
              (input as HTMLInputElement).name = curr.id;
              self.props.isOpen = false;
            },
          },
        }));
        return acc;
      }, [] as MenuItem[]),
    });
  }

  render() {
    return this.compile(tpl, {
      id: this.props.id,
      input: this.children.input,
      list: this.children.list,
      isOpen: this.props.isOpen,
    });
  }
}

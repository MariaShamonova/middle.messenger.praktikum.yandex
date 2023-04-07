import tpl from './dropdown.hbs';
import './dropdown.less';
import { DropdownPropsType } from './types';
import Block from '../../utils/Block';
import Button from '../button/Button';
import { ButtonVariantType } from '../button/types';
import Menu from '../menu/Menu';
import MenuItem from '../menu/components/MenuItem';
import { MenuOptionType } from '../menu/types';

export default class Dropdown extends Block {
  constructor(props: DropdownPropsType, tagName = 'div') {
    super(props, tagName);
    const self = this;
    this.props.isOpen = false;
    this.props.size = this.props.size || 32;
    this.props.position = this.props.position || 'top';

    this.children.dropdownButton = new Button({
      icon: this.props.button.icon,
      alt: this.props.button.alt,
      variant: ButtonVariantType.borderless,
      events: {
        click() {
          self.props.isOpen = !self.props.isOpen;
        },
      },
    });

    this.children.optionList = new Menu({
      id: this.props.id,
      position: this.props.position,
      options: this.props.options.reduce((
        acc: MenuItem[],
        curr: MenuOptionType,
      ) => {
        acc.push(new MenuItem({
          option: curr,
          events: {
            click() {
              curr.click();
              self.props.isOpen = !self.props.isOpen;
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
      isOpen: this.props.isOpen,
      size: this.props.size,
      optionList: this.children.optionList,
      position: this.props.position,
      dropdownButton: this.children.dropdownButton,

    });
  }
}

export type DropdownType = Dropdown;

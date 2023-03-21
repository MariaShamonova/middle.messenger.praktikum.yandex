import tpl from './menuItem.hbs';
import './menuItem.less';
import Block from '../../../utils/block';
import { MenuItemPropsType } from './types';

export default class MenuItem extends Block {
  constructor(props: MenuItemPropsType, tagName = 'div') {
    super(props, tagName);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

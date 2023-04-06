import tpl from './routerLink.hbs';
import './routerLink.less';
import Block from '../../utils/Block';
import { RouterLinkPropsType } from './types';

export default class RouterLink extends Block {
  constructor (props: RouterLinkPropsType, tagName = 'div') {
    super(props, tagName);
  }

  render () {
    return this.compile(tpl, this.props);
  }
}

export type RouterLinkType = RouterLink;

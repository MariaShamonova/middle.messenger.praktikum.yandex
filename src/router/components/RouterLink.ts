import tpl from './routerLink.hbs';
import './routerLink.less';
import Block from '../../modules/block';
import { RouterLinkPropsType } from './types';

export default class RouterLink extends Block {
  constructor(props: RouterLinkPropsType) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export type RouterLinkType = RouterLink;

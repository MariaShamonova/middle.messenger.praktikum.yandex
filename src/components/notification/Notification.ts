import tpl from './notification.hbs';
import './notification.less';
import Block from '../../utils/block';
import { NotificationPropsType } from './types';

export default class Notification extends Block {
  constructor(props: NotificationPropsType, tagName = 'div') {
    super(props, tagName);
  }

  render() {
    return this.compile(tpl, {
      ...this.props,
      open: this.props.isOpen ? 'show' : 'hide',
    });
  }
}

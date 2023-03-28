import tpl from './message.hbs';
import './message.less';
import Block from '../../../../utils/block';
import { MessageProps } from './types';

export default class Message extends Block {
  constructor(props: MessageProps, tagName = 'div') {
    super(props, tagName);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export type MessageType = Message;

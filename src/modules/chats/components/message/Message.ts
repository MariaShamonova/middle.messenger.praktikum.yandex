import tpl from './message.hbs';
import './message.less';
import Block from '../../../block';
import { MessageProps } from './types';

export default class Message extends Block {
  constructor(props: MessageProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export type MessageType = Message;

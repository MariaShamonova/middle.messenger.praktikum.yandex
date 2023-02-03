import tpl from './lastMessage.hbs';
import './lastMessage.less';
import Block from '../../../block';
import { LastMessageProps } from './types';

export default class LastMessage extends Block {
  public props: any;

  constructor({
    name = '', text = '', date = '', counter = 0, avatarPath = '',
  }: LastMessageProps) {
    const props = {
      name, text, date, counter, avatarPath,
    };
    super('div', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export type LastMessageType = LastMessage;

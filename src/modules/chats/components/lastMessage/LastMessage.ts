import tpl from './lastMessage.hbs';
import './lastMessage.less';
import Block from '../../../../utils/block';
import { LastMessageProps } from './types';
import formatDate from '../../../../helpers/formatDate';

export default class LastMessage extends Block {
  public props: any;

  constructor(props: LastMessageProps) {
    super('div', props);
  }

  render() {
    if (this.props.message.last_message) {
      this.props.message.last_message.time = formatDate(this.props.message.last_message.time);
    }

    return this.compile(tpl, this.props);
  }
}

export type LastMessageType = LastMessage;

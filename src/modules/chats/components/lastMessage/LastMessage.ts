import tpl from './lastMessage.hbs';
import './lastMessage.less';
import Block from '../../../../utils/block';
import { LastMessageProps } from './types';
import formatDate from '../../../../helpers/formatDate';
import IconUser from '../../../../../static/images/icon-user.png';

export default class LastMessage extends Block {
  constructor(props: LastMessageProps, tagName = 'div') {
    super(props, tagName);
  }

  render() {
    if (this.props.message.last_message) {
      this.props.message.last_message.time = formatDate(this.props.message.last_message.time);
    }

    return this.compile(tpl, { ...this.props, IconUser });
  }
}

export type LastMessageType = LastMessage;

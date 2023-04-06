import tpl from './avatar.hbs';
import './avatar.less';
import Block from '../../../utils/Block';
import { AvatarProps } from './types';
import { API_URL } from '../../../utils/HTTPTransport';

export default class Avatar extends Block {
  constructor (props: AvatarProps, tagName = 'div') {
    super(props, tagName);
  }

  render () {
    return this.compile(tpl, {
      id: this.props.id,
      API_URL,
      avatar: this.props.avatar,
    });
  }
}

export type AvatarType = Avatar;

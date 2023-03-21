import tpl from './avatar.hbs';
import './avatar.less';
import Block from '../../../utils/block';
import { AvatarProps } from './types';

export default class Avatar extends Block {
  constructor(props: AvatarProps, tagName = 'div') {
    super(props, tagName);
  }

  render() {
    console.log(this.props);
    return this.compile(tpl, {
      id: this.props.id,
      avatar: this.props.avatar,
    });
  }
}

export type AvatarType = Avatar;

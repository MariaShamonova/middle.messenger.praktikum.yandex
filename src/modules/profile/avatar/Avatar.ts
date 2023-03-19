import tpl from './avatar.hbs';
import './avatar.less';
import Block from '../../../utils/block';
import { AvatarProps } from './types';

export default class Avatar extends Block {
  constructor(props: AvatarProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, {
      path: this.props.path,
    });
  }
}

export type AvatarType = Avatar;

import Block from '../../../block';
import tpl from '../../../profile/avatar/avatar.hbs';
import { MessageProps } from './types';

export default class Message extends Block {
  public props: any;

  constructor(props: MessageProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

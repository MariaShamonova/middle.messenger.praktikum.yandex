import tpl from './input.hbs';
import './input.less';
import {
  InputPropsType, InputBlockType, InputSizeType, InputValueType,
} from './types';
import Block from '../../modules/block';

export default class Input extends Block {
  public props: any;

  constructor({
    name,
    label,
    placeholder,

    value = '',
    type = InputValueType.text,
    size = InputSizeType.m,
    block = InputBlockType.fit,
    required = false,
    events = {},
  }: InputPropsType) {
    const props = {
      name, label, placeholder, value, type, size, block, required, events,
    };
    super('input', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export type InputType = Input;

import tpl from './button.hbs';
import './button.less';
import {
  ButtonPropsType, ButtonValueType, ButtonVariantType, ButtonSizeType, ButtonBlockType,
} from './types';
import Block from '../../utils/block';

export default class Button extends Block {
  constructor(props: ButtonPropsType) {
    super('button', props);
  }

  render() {
    const {
      text = '',
      link = '',
      type = ButtonValueType.button,
      variant = ButtonVariantType.primary,
      size = ButtonSizeType.m,
      block = ButtonBlockType.fit,
    } = this.props;

    return this.compile(tpl, {
      text, type, variant, link, size, block,
    });
  }
}

export type ButtonType = Button;

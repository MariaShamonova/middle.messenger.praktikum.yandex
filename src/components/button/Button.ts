import tpl from './button.hbs';
import './button.less';
import {
  ButtonPropsType, ButtonValueType, ButtonVariantType, ButtonSizeType, ButtonBlockType,
} from './types';
import Block from '../../utils/block';

export default class Button extends Block {
  constructor(props: ButtonPropsType, tagName = 'button') {
    super(props, tagName);
    this.props.text = this.props.text || '';
    this.props.link = this.props.link || '';
    this.props.type = this.props.type || ButtonValueType.button;
    this.props.variant = this.props.variant || ButtonVariantType.primary;
    this.props.size = this.props.size || ButtonSizeType.m;
    this.props.block = this.props.block || ButtonBlockType.fit;
  }

  render() {
    console.log(this.props.icon);
    return this.compile(tpl, this.props);
  }
}

export type ButtonType = Button;

import tpl from './button.hbs';
import './button.less';
import {
  ButtonPropsType, ButtonType, ButtonVariantType, ButtonSizeType, ButtonBlockType,
} from './types';

export default ({
  id,
  text = '',
  link = '',
  type = ButtonType.button,
  variant = ButtonVariantType.primary,
  size = ButtonSizeType.m,
  block = ButtonBlockType.fit,
}: ButtonPropsType) => tpl({
  id, text, type, variant, link, size, block,
});

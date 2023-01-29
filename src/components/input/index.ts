import tpl from './input.hbs';
import './input.less';
import {
  InputPropsType, InputBlockType, InputSizeType, InputType,
} from './types';

export default ({
  id,
  label,
  placeholder,

  value = '',
  type = InputType.text,
  size = InputSizeType.m,
  block = InputBlockType.fit,
  required = false,
}: InputPropsType) => tpl({
  id, type, label, placeholder, value, size, block, required,
});

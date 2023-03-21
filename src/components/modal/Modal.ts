import tpl from './modal.hbs';
import './modal.less';
import Block from '../../utils/block';
import { ModalPropsType } from './types';

export default class Modal extends Block {
  constructor(props: ModalPropsType, tagName = 'div') {
    super(props, tagName);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

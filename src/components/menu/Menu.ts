import tpl from './menu.hbs';
import './menu.less';
import Block from '../../utils/Block';
import { MenuPropsType } from './types';
import { AutocompleteBlockType } from '../autocomplete/types';

export default class Menu extends Block {
  constructor (props: MenuPropsType, tagName = 'div') {
    super(props, tagName);
    this.props.block = this.props.block || AutocompleteBlockType.fit;
    this.children.options = this.props.options;
  }

  render () {
    return this.compile(tpl, {
      id: this.props.id,
      position: this.props.position,
      options: this.children.options,
      block: this.props.block,
      type: this.props.type,
    });
  }
}

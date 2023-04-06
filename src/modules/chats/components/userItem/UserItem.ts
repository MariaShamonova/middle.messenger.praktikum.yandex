import tpl from './userItem.hbs';
import './userItem.less';
import Block from '../../../../utils/Block';
import { ListUsersPropsType } from './types';

export default class UserItem extends Block {
  constructor (props: ListUsersPropsType, tagName = 'div') {
    super(props, tagName);
  }

  render () {
    return this.compile(tpl, {
      first_name: this.props.first_name,
      second_name: this.props.second_name,
      role: this.props.role,
      selected: this.props.selected,
    });
  }
}
export type UserItemType = UserItem;

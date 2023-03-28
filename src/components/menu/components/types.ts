import { MenuOptionType } from '../types';

export interface MenuItemPropsType {
  option: MenuOptionType;
  events?: { [key: string]: Function };
}

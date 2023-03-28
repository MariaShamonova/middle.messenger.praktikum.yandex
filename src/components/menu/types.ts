import MenuItem from './components/MenuItem';
import { AutocompleteBlockType } from '../autocomplete/types';

export interface MenuOptionType {
  id: string;
  title: string;
  icon?: string;
  click: () => void;
}

export interface MenuPropsType {
  id: string;
  options: MenuItem[];
  position: string;
  block?: AutocompleteBlockType;
}

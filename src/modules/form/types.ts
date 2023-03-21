import { InputType } from '../../components/input/Input';
import { ButtonType } from '../../components/button/Button';
import Autocomplete from '../../components/autocomplete/Autocomplete';
import { UserItemType } from '../chats/components/userItem/UserItem';

export interface FormPropsType {
  title?: string;
  fields: InputType[] | Autocomplete[] | UserItemType[];
  submitButton: ButtonType;
  secondaryButton?: ButtonType;
  borderlessButton?: ButtonType;
  actions?: { [key: string]: Function };
}

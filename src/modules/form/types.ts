import { InputType } from '../../components/input/Input';
import { ButtonType } from '../../components/button/Button';

export interface FormPropsType {
  title?: string;
  fields: InputType[];
  submitButton: ButtonType;
  secondaryButton?: ButtonType;
  borderlessButton?: ButtonType;
  actions?: { [key: string]: Function };
}

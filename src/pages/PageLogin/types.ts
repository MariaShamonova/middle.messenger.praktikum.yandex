import { ButtonType } from '../../components/button/Button';
import { InputType } from '../../components/input/Input';

export interface PageLoginPropsType {
  title: string;
  form: {
    login: string
    password: string
  };
}

export interface PageLoginChildType {
  buttonAuth: ButtonType;
  loginInput: InputType;
  passwordInput: InputType;
  linkToRegistration: ButtonType;
}

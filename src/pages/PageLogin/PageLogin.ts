import tpl from './login.hbs';
import './login.less';
import Block from '../../modules/block';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { PageLoginPropsType } from './types';
import { ButtonBlockType, ButtonValueType, ButtonVariantType } from '../../components/button/types';
import { InputBlockType, InputValueType } from '../../components/input/types';

export default class PageLogin extends Block {
  public props: any;

  constructor(props: PageLoginPropsType) {
    super('div', props);
    this.children.buttonAuth = new Button({
      text: 'Вход',
      block: ButtonBlockType.fill,
      events: {
        click: () => {
          console.log('login');
        },
      },
    });
    this.children.loginInput = new Input({
      name: 'login',
      label: 'Логин',
      placeholder: 'Введите логин',
      block: InputBlockType.fill,
    });
    this.children.passwordInput = new Input({
      name: 'password',
      type: InputValueType.password,
      label: 'Пароль',
      placeholder: 'Введите пароль',
      block: InputBlockType.fill,
    });
    this.children.linkToRegistration = new Button({
      text: 'Зарегистрироваться',
      link: '/registration',
      type: ButtonValueType.button,
      variant: ButtonVariantType.borderless,
      block: ButtonBlockType.fill,
    });
  }

  changeLogin(value: string) {
    this.setProps({ login: value });
  }

  render() {
    return this.compile(tpl, {
      title: this.props.title,
      buttonAuth: this.children.buttonAuth,
      loginInput: this.children.loginInput,
      passwordInput: this.children.passwordInput,
      linkToRegistration: this.children.linkToRegistration,
    });
  }
}

export type PageLoginType = PageLogin;

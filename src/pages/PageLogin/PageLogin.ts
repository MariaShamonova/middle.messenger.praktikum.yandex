import tpl from './login.hbs';
import './login.less';
import Block from '../../modules/block';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { PageLoginPropsType } from './types';
import { ButtonBlockType, ButtonValueType, ButtonVariantType } from '../../components/button/types';
import { InputBlockType, InputValueType } from '../../components/input/types';
import Form from '../../modules/form/Form';

export default class PageLogin extends Block {
  constructor(props: PageLoginPropsType) {
    super('div', props);
    const self = this;

    this.children.form = new Form({
      title: 'Авторизоваться',
      fields: [
        new Input({
          value: '',
          name: 'login',
          label: 'Логин',
          placeholder: 'Введите логин',
          block: InputBlockType.fill,
        }),
        new Input({
          value: '',
          name: 'password',
          type: InputValueType.password,
          label: 'Пароль',
          placeholder: 'Введите пароль',
          block: InputBlockType.fill,
        }),

      ],
      submitButton: new Button({
        text: 'Вход',
        block: ButtonBlockType.fill,
        type: ButtonValueType.submit,
      }),
      borderlessButton: new Button({
        text: 'Зарегистрироваться',
        link: '/registration',
        type: ButtonValueType.button,
        variant: ButtonVariantType.borderless,
        block: ButtonBlockType.fill,
      }),
      action() {
        self.login();
      },

    });
  }

  login() {
    console.log('login');
  }

  render() {
    return this.compile(tpl, {
      form: this.children.form,
    });
  }
}

export type PageLoginType = PageLogin;

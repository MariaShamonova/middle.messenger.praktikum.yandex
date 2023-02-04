import tpl from './registration.hbs';
import './registration.less';
import { PageRegistrationPropsType } from './types';
import Block from '../../modules/block';
import Input from '../../components/input/Input';
import { InputBlockType, InputValueType } from '../../components/input/types';
import Button from '../../components/button/Button';
import { ButtonBlockType, ButtonValueType, ButtonVariantType } from '../../components/button/types';

export default class PageRegistration extends Block {
  public props: any;

  public form: {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    confirm_password: string
    phone: string;
  };

  constructor(props: PageRegistrationPropsType) {
    super('div', props);

    this.form = {
      first_name: '',
      second_name: '',
      login: '',
      email: '',
      password: '',
      confirm_password: '',
      phone: '',
    };
    const self = this;
    this.children.firstNameInput = new Input({
      name: 'first_name',
      label: 'Имя',
      placeholder: 'Введите имя',
      block: InputBlockType.fill,
      events: {
        input(evn: KeyboardEvent) {
          self.setFieldForm(evn, 'first_name');
        },
      },
    });

    this.children.secondNameInput = new Input(
      {
        name: 'second_name',
        label: 'Фамилия',
        placeholder: 'Введите фамилию',
        block: InputBlockType.fill,
        events: {
          input(evn: KeyboardEvent) {
            self.setFieldForm(evn, 'second_name');
          },
        },
      },
    );
    this.children.loginInput = new Input(
      {
        name: 'login',
        label: 'Логин',
        placeholder: 'Введите логин',
        block: InputBlockType.fill,
        required: true,
        events: {
          input(evn: KeyboardEvent) {
            self.setFieldForm(evn, 'login');
          },
        },
      },
    );

    this.children.emailInput = new Input(
      {
        name: 'email',
        label: 'Email',
        placeholder: 'Введите почту',
        block: InputBlockType.fill,
        events: {
          input(evn: KeyboardEvent) {
            self.setFieldForm(evn, 'email');
          },
        },
      },
    );

    this.children.passwordInput = new Input(
      {
        name: 'password',
        type: InputValueType.password,
        label: 'Пароль',
        placeholder: 'Введите пароль',
        block: InputBlockType.fill,
        required: true,
        events: {
          input(evn: KeyboardEvent) {
            self.setFieldForm(evn, 'password');
          },
        },
      },
    );

    this.children.confirmPasswordInput = new Input(
      {
        name: 'confirm_password',
        type: InputValueType.password,
        label: 'Пароль еще раз',
        placeholder: 'Введите пароль еще раз',
        block: InputBlockType.fill,
        required: true,
        events: {
          input(evn: KeyboardEvent) {
            self.setFieldForm(evn, 'confirm_password');
          },
        },
      },
    );

    this.children.phoneInput = new Input(
      {
        name: 'phone',
        label: 'Телефон',
        placeholder: 'Введите номер телефона',
        block: InputBlockType.fill,
        events: {
          input(evn: KeyboardEvent) {
            self.setFieldForm(evn, 'phone');
          },
        },
      },
    );

    this.children.buttonRegistration = new Button(
      {
        text: 'Создать аккаунт',
        type: ButtonValueType.submit,
        block: ButtonBlockType.fill,
        events: {
          click() {
            console.log(self.form);
          },
        },
      },
    );

    this.children.linkToAuth = new Button(
      {
        text: 'Уже есть аккаунт?',
        link: '/login',
        variant: ButtonVariantType.borderless,
      },
    );
  }

  setFieldForm(evn: KeyboardEvent, fieldName: string) {
    const target = evn.target as HTMLInputElement;
    this.form[fieldName as keyof typeof this.form] = target.value;
  }

  render() {
    return this.compile(tpl, {
      firstNameInput: this.children.firstNameInput,
      secondNameInput: this.children.secondNameInput,
      loginInput: this.children.loginInput,
      emailInput: this.children.emailInput,
      passwordInput: this.children.passwordInput,
      confirmPasswordInput: this.children.confirmPasswordInput,
      phoneInput: this.children.phoneInput,
      buttonRegistration: this.children.buttonRegistration,
      linkToAuth: this.children.linkToAuth,
    });
  }
}

export type PageRegistrationType = PageRegistration;

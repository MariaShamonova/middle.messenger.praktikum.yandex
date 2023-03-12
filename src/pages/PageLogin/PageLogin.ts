import tpl from './login.hbs';
import './login.less';
import Block from '../../modules/block';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { PageLoginPropsType } from './types';
import { ButtonBlockType, ButtonValueType, ButtonVariantType } from '../../components/button/types';
import { InputBlockType, InputValueType } from '../../components/input/types';
import Form from '../../modules/form/Form';
import Validator from '../../utils/validator';
import getFormValues from '../../utils/getFormValues';
import LoginController from '../../controllers/LoginController';

export default class PageLogin extends Block {
  constructor (props: PageLoginPropsType) {
    super('div', props);
    this.props.title = 'Авторизация';
    this.props.form = {
      login: '',
      password: '',
    };
    this.children.form = new Form({
      title: 'Авторизоваться',
      fields: [
        new Input({
          value: '',
          name: 'login',
          label: 'Логин',
          placeholder: 'Введите логин',
          block: InputBlockType.fill,
          events: {
            input (evn: Event) {
              const target = evn.target as HTMLInputElement;
              Validator.setErrorValue(target, '');
            },
            blur (evn: Event) {
              const target = evn.target as HTMLInputElement;
              Validator.validateInput(target.value, null, evn);
            },
          },
        }),
        new Input({
          value: '',
          name: 'password',
          type: InputValueType.password,
          label: 'Пароль',
          placeholder: 'Введите пароль',
          block: InputBlockType.fill,
          events: {
            input (evn: Event) {
              const target = evn.target as HTMLInputElement;
              Validator.setErrorValue(target, '');
            },
            blur (evn: Event) {
              const target = evn.target as HTMLInputElement;
              Validator.validateInput(target.value, null, evn);
            },
          },
        }),

      ],
      submitButton: new Button({
        text: 'Вход',
        block: ButtonBlockType.fill,
        type: ButtonValueType.submit,
        events: {
          click (evn: Event) {
            evn.preventDefault();
            const formElement: HTMLFormElement = this.closest('form')!;
            const isValidForm = Validator.validateForm(formElement);
            if (isValidForm) {
              const form = getFormValues(formElement);
              LoginController.login(form);
            }
          },
        },
      }),
      borderlessButton: new Button({
        text: 'Зарегистрироваться',
        link: '/registration',
        type: ButtonValueType.button,
        variant: ButtonVariantType.borderless,
        block: ButtonBlockType.fill,
      }),
    });
  }

  render () {
    return this.compile(tpl, {
      form: this.children.form,
    });
  }
}

export type PageLoginType = PageLogin;
export type PageLoginTypeOf = typeof PageLogin;

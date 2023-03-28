import tpl from './registration.hbs';
import './registration.less';
import { PageRegistrationPropsType } from './types';
import Block from '../../utils/block';
import Input from '../../components/input/Input';
import { InputBlockType, InputValueType } from '../../components/input/types';
import Button from '../../components/button/Button';
import { ButtonBlockType, ButtonValueType, ButtonVariantType } from '../../components/button/types';
import Form from '../../modules/form/Form';
import Validator from '../../utils/validator';
import withStore from '../../hoc/withStore';
import AuthController from '../../controllers/AuthController';
import RouterLink from '../../router/components/RouterLink';
import Router from '../../router/Router';

class PageRegistration extends Block {
  constructor(props: PageRegistrationPropsType, tagName = 'div') {
    super(props, tagName);

    this.props.title = 'Регистрация';

    const inputEvents = {
      input(evn: Event) {
        const target = evn.target as HTMLInputElement;
        Validator.setErrorValue(target, '');
      },
      blur(evn: Event) {
        const target = evn.target as HTMLInputElement;
        Validator.validateInput(target.value, null, evn);
      },
    };
    this.children.form = new Form({
      title: 'Регистрация',
      fields: [
        new Input({
          name: 'first_name',
          label: 'Имя',
          placeholder: 'Введите имя',
          block: InputBlockType.fill,
          events: inputEvents,

        }),
        new Input({
          name: 'second_name',
          label: 'Фамилия',
          placeholder: 'Введите фамилию',
          block: InputBlockType.fill,
          events: inputEvents,
        }),
        new Input({
          name: 'login',
          label: 'Логин',
          placeholder: 'Введите логин',
          block: InputBlockType.fill,
          required: true,
          events: inputEvents,

        }),
        new Input({
          name: 'email',
          label: 'Email',
          placeholder: 'Введите почту',
          block: InputBlockType.fill,
          events: inputEvents,

        }),
        new Input({
          id: 'password',
          name: 'password',
          type: InputValueType.password,
          label: 'Пароль',
          placeholder: 'Введите пароль',
          block: InputBlockType.fill,
          required: true,
          events: {
            input(evn: Event) {
              const target = evn.target as HTMLInputElement;
              Validator.setErrorValue(target, '');
            },
            blur(evn: Event) {
              const target = evn.target as HTMLInputElement;
              Validator.validateInput(target.value, null, evn);
              const form = target.closest('form')!;
              const confirmPasswordInput = form.querySelector(
                'input[id="confirm_password"]',
              ) as HTMLInputElement;
              Validator.validatePasswords(target, confirmPasswordInput);
            },
          },
        }),
        new Input(
          {
            id: 'confirm_password',
            name: 'confirm_password',
            type: InputValueType.password,
            label: 'Пароль еще раз',
            placeholder: 'Введите пароль еще раз',
            block: InputBlockType.fill,
            required: true,
            events: {
              input(evn: Event) {
                const target = evn.target as HTMLInputElement;
                Validator.setErrorValue(target, '');
              },
              blur(evn: Event) {
                const target = evn.target as HTMLInputElement;
                Validator.validateInput(target.value, null, evn);
                const form = target.closest('form')!;
                const passwordInput = form.querySelector(
                  'input[id="password"]',
                ) as HTMLInputElement;
                Validator.validatePasswords(passwordInput, target);
              },
            },
          },
        ),
        new Input(
          {
            name: 'phone',
            label: 'Телефон',
            placeholder: 'Введите номер телефона',
            block: InputBlockType.fill,
            events: inputEvents,
          },
        ),

      ],
      submitButton: new Button(
        {
          text: 'Создать аккаунт',
          type: ButtonValueType.submit,
          block: ButtonBlockType.fill,
          events: {
            click(evn: Event) {
              evn.preventDefault();
              const formElement: HTMLFormElement = this.closest('form')!;
              AuthController.signup(formElement);
            },
          },
        },
      ),
      borderlessButton: new Button(
        {
          text: 'Уже есть аккаунт?',
          block: ButtonBlockType.fill,
          link: new RouterLink({
            text: 'Уже есть аккаунт?',
            events: {
              async click() {
                await Router.go('/');
              },
            },
          }),
          variant: ButtonVariantType.borderless,
        },
      ),
    });
  }

  render() {
    return this.compile(tpl, {
      form: this.children.form,
    });
  }
}

export default withStore(() => {})(PageRegistration);

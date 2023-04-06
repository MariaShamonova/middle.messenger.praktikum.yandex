import tpl from './login.hbs';
import './login.less';
import Block from '../../utils/Block';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { PageLoginPropsType } from './types';
import { ButtonBlockType, ButtonValueType, ButtonVariantType } from '../../components/button/types';
import { InputBlockType, InputValueType } from '../../components/input/types';
import Form from '../../modules/form/Form';
import Validator from '../../utils/validator';
import withStore from '../../hoc/withStore';
import AuthController from '../../controllers/AuthController';
import RouterLink from '../../router/components/RouterLink';

class PageLogin extends Block {
  constructor (props: PageLoginPropsType, tagName = 'div') {
    super(props, tagName);
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
          async click (evn: Event) {
            evn.preventDefault();
            const formElement: HTMLFormElement = this.closest('form')!;
            await AuthController.signin(formElement);
          },
        },
      }),
      borderlessButton: new Button({
        text: 'Зарегистрироваться',
        link: new RouterLink({
          text: 'Зарегистрироваться',
          events: {
            async click () {
              await AuthController.goToRegistration();
            },
          },
        }),
        type: ButtonValueType.button,
        variant: ButtonVariantType.borderless,
        block: ButtonBlockType.fill,
      }),
    });
  }

  render () {
    const button = new Button({ text: 'click' });
    button.dispatchComponentDidMount();
    return this.compile(tpl, {
      form: this.children.form,
    });
  }
}

export default withStore(() => {})(PageLogin);

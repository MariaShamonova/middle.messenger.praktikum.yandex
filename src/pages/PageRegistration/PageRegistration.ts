import tpl from './registration.hbs';
import './registration.less';
import { PageRegistrationPropsType } from './types';
import Block from '../../modules/block';
import Input from '../../components/input/Input';
import { InputBlockType, InputValueType } from '../../components/input/types';
import Button from '../../components/button/Button';
import { ButtonBlockType, ButtonValueType, ButtonVariantType } from '../../components/button/types';
import Form from '../../modules/form/Form';

export default class PageRegistration extends Block {
  constructor(props: PageRegistrationPropsType) {
    super('div', props);
    const self = this;

    this.children.form = new Form({
      title: 'Регистрация',
      fields: [
        new Input({
          name: 'first_name',
          label: 'Имя',
          placeholder: 'Введите имя',
          block: InputBlockType.fill,

        }),
        new Input({
          name: 'second_name',
          label: 'Фамилия',
          placeholder: 'Введите фамилию',
          block: InputBlockType.fill,

        }),
        new Input({
          name: 'login',
          label: 'Логин',
          placeholder: 'Введите логин',
          block: InputBlockType.fill,
          required: true,

        }),
        new Input({
          name: 'email',
          label: 'Email',
          placeholder: 'Введите почту',
          block: InputBlockType.fill,

        }),
        new Input({
          id: 'password',
          name: 'password',
          type: InputValueType.password,
          label: 'Пароль',
          placeholder: 'Введите пароль',
          block: InputBlockType.fill,
          required: true,

        }),
        new Input(
          {
            id: 'confirm_password',
            type: InputValueType.password,
            label: 'Пароль еще раз',
            placeholder: 'Введите пароль еще раз',
            block: InputBlockType.fill,
            required: true,

          },
        ),
        new Input(
          {
            name: 'phone',
            label: 'Телефон',
            placeholder: 'Введите номер телефона',
            block: InputBlockType.fill,

          },
        ),

      ],
      submitButton: new Button(
        {
          text: 'Создать аккаунт',
          type: ButtonValueType.submit,
          block: ButtonBlockType.fill,

        },
      ),
      borderlessButton: new Button(
        {
          text: 'Уже есть аккаунт?',
          block: ButtonBlockType.fill,
          link: '/login',
          variant: ButtonVariantType.borderless,
        },
      ),
      action() {
        self.registration();
      },
    });
  }

  registration() {
    console.log('registration');
  }

  render() {
    return this.compile(tpl, {
      form: this.children.form,
    });
  }
}

export type PageRegistrationType = PageRegistration;

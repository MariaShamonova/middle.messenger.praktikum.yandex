import tpl from './profile.hbs';
import './profile.less';
import { PageProfilePropsType } from './types';
import Block from '../../modules/block';
import Avatar from '../../modules/profile/avatar/Avatar';
import ProfileProperty,
{ ProfilePropertyType } from '../../modules/profile/profileProperty/ProfileProperty';
import Input, { InputType } from '../../components/input/Input';
import { InputBlockType, InputValueType } from '../../components/input/types';
import Button from '../../components/button/Button';
import { ButtonBlockType, ButtonValueType, ButtonVariantType } from '../../components/button/types';
import Form from '../../modules/form/Form';
import properties from './const';
import renderDOM from '../../utils/renderDOM';
import Validator from '../../utils/validator';
import getFormValues from '../../utils/getFormValues';
import ProfileController from '../../controllers/ProfileController';

export default class PageProfile extends Block {
  constructor(props: PageProfilePropsType) {
    super('div', props);

    const self = this;
    this.children.avatar = new Avatar({ path: '' });
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

    this.children.formPassword = new Form({
      fields: [
        new Input(
          {
            required: true,
            name: 'oldPassword',
            type: InputValueType.password,
            label: 'Старый пароль',
            placeholder: 'Введите старый пароль',
            block: InputBlockType.fill,
            events: inputEvents,
          },
        ),
        new Input(
          {
            id: 'password',
            required: true,
            name: 'newPassword',
            type: InputValueType.password,
            label: 'Новый пароль',
            placeholder: 'Введите новый пароль',
            block: InputBlockType.fill,
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
          },
        ),
        new Input(
          {
            id: 'confirm_password',
            required: true,
            name: 'confirmNewPassword',
            type: InputValueType.password,
            label: 'Новый пароль еще раз',
            placeholder: 'Введите новый пароль еще раз',
            block: InputBlockType.fill,
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
      ],
      submitButton: new Button(
        {
          text: 'Сохранить',
          block: ButtonBlockType.fill,
          type: ButtonValueType.submit,
          events: {
            click(evn: Event) {
              evn.preventDefault();
              const formElement: HTMLFormElement = this.closest('form')!;
              const isValidForm = Validator.validateForm(formElement);
              if (isValidForm) {
                const form = getFormValues(formElement);
                ProfileController.changePassword(form);
              }
            },
          },
        },
      ),
      secondaryButton: new Button(
        {
          text: 'Отменить',
          type: ButtonValueType.reset,
          variant: ButtonVariantType.secondary,
          block: ButtonBlockType.fill,
          events: {
            click() {
              self.changeMode('default');
            },
          },
        },
      ),
    });

    this.children.formUser = new Form({
      fields: properties.reduce((acc: InputType[], curr) => {
        acc.push(new Input({
          name: curr.name,
          label: curr.title,
          placeholder: curr.placeholder,
          value: curr.value,
          block: InputBlockType.fill,
          events: inputEvents,
        }));
        return acc;
      }, [] as InputType[]),
      submitButton: new Button(
        {
          text: 'Сохранить',
          block: ButtonBlockType.fill,
          type: ButtonValueType.submit,
          events: {
            click(evn: Event) {
              evn.preventDefault();
              const formElement: HTMLFormElement = this.closest('form')!;
              const isValidForm = Validator.validateForm(formElement);
              if (isValidForm) {
                const form = getFormValues(formElement);
                ProfileController.changeUserData(form);
              }
            },
          },

        },
      ),
      secondaryButton: new Button(
        {
          text: 'Отменить',
          type: ButtonValueType.reset,
          variant: ButtonVariantType.secondary,
          block: ButtonBlockType.fill,
          events: {
            click() {
              self.changeMode('default');
            },
          },
        },
      ),
    });

    this.children.profileProperties = properties.reduce((acc: ProfilePropertyType[], curr) => {
      acc.push(new ProfileProperty({ title: curr.title, value: curr.value }));
      return acc;
    }, []);

    this.children.buttonEditData = new Button(
      {
        text: 'Редактировать профиль',
        block: ButtonBlockType.fill,
        events: {
          click() {
            self.changeMode('editData');
          },
        },
      },
    );

    this.children.buttonEditPassword = new Button(
      {
        text: 'Изменить пароль',
        variant: ButtonVariantType.secondary,
        block: ButtonBlockType.fill,
        events: {
          click() {
            self.changeMode('editPassword');
          },
        },
      },
    );

    this.children.buttonExit = new Button(
      {
        text: 'Выйти',
        variant: ButtonVariantType.borderless,
        block: ButtonBlockType.fill,
        link: '/login',
        events: {
          click() {
            console.log('logout');
          },
        },
      },
    );
  }

  changeMode(currentMode: string) {
    this.setProps({ mode: currentMode });
    renderDOM('#root', this);
  }

  render() {
    return this.compile(tpl, {
      mode: this.props.mode,
      avatar: this.children.avatar,
      profileProperties: this.children.profileProperties,
      buttonEditPassword: this.children.buttonEditPassword,
      buttonEditData: this.children.buttonEditData,
      buttonExit: this.children.buttonExit,
      formPassword: this.children.formPassword,
      formUser: this.children.formUser,
    });
  }
}

export type PageProfileType = PageProfile;

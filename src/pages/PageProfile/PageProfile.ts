import tpl from './profile.hbs';
import './profile.less';
import { PageProfilePropsType } from './types';
import Block from '../../modules/block';
import Avatar from '../../modules/profile/avatar/Avatar';
import ProfileProperty, { ProfilePropertyType } from '../../modules/profile/profileProperty/ProfileProperty';
import Input, { InputType } from '../../components/input/Input';
import { InputBlockType, InputValueType } from '../../components/input/types';
import Button from '../../components/button/Button';
import { ButtonBlockType, ButtonValueType, ButtonVariantType } from '../../components/button/types';
import properties from './const';
import renderDOM from '../../utils/renderDOM';

type FormUserType = {
  first_name: string;
  second_name: string;
  email: string;
  login: string;
  display_name: string;
  phone: string;
};

type FormPasswordType = {
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
};

function getInputValue(evn: KeyboardEvent) {
  const target = evn.target as HTMLInputElement;
  return target.value;
}

export default class PageProfile extends Block {
  public props: any;

  public children: any;

  public formUser: FormUserType;

  public formPassword: FormPasswordType;

  constructor(props: PageProfilePropsType) {
    super('div', props);

    this.formUser = properties.reduce((acc: FormUserType, curr) => {
      acc[curr.name as keyof FormUserType] = curr.value;
      return acc;
    }, {} as FormUserType);

    this.formPassword = {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    };

    const self = this;
    this.children.avatar = new Avatar({ path: '' });

    this.children.profileProperties = properties.reduce((acc: InputType[], curr) => {
      acc.push(new ProfileProperty({ title: curr.title, value: curr.value }));
      return acc;
    }, []);

    this.children.editProfileProperties = properties.reduce((acc: ProfilePropertyType[], curr) => {
      acc.push(new Input({
        name: curr.name,
        label: curr.title,
        placeholder: curr.placeholder,
        value: curr.value,
        block: InputBlockType.fill,
        events: {
          input(evn: KeyboardEvent) {
            self.formUser[curr.name as keyof FormUserType] = getInputValue(evn);
          },
        },
      }));
      return acc;
    }, []);
    this.children.oldPasswordInput = new Input(
      {
        name: 'oldPassword',
        type: InputValueType.password,
        label: 'Старый пароль',
        placeholder: 'Введите старый пароль',
        block: InputBlockType.fill,
        // events: {
        //   input(evn: KeyboardEvent) {
        //     self.formPassword.oldPassword = getInputValue(evn);
        //   },
        // },
      },
    );

    this.children.newPasswordInput = new Input(
      {
        name: 'newPassword',
        type: InputValueType.password,
        label: 'Новый пароль',
        placeholder: 'Введите новый пароль',
        block: InputBlockType.fill,
        events: {
          input(evn: KeyboardEvent) {
            self.formPassword.newPassword = getInputValue(evn);
          },
        },
      },
    );
    this.children.confirmNewPasswordInput = new Input(
      {
        name: 'confirmNewPassword',
        type: InputValueType.password,
        label: 'Новый пароль еще раз',
        placeholder: 'Введите новый пароль еще раз',
        block: InputBlockType.fill,
        events: {
          input(evn: KeyboardEvent) {
            self.formPassword.confirmNewPassword = getInputValue(evn);
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
    this.children.buttonExit = new Button(
      {
        text: 'Выйти',
        variant: ButtonVariantType.borderless,
        block: ButtonBlockType.fill,
        events: {
          click() {
            console.log('logout');
          },
        },
      },
    );
    this.children.buttonReturnToDefaultMode = new Button(
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
    );

    this.children.buttonSaveData = new Button(
      {
        text: 'Сохранить',
        block: ButtonBlockType.fill,
        events: {
          click() {
            console.log(self.formUser);
            self.changeMode('default');
          },
        },
      },
    );
    this.children.buttonSavePassword = new Button(
      {
        text: 'Сохранить',
        block: ButtonBlockType.fill,
        events: {
          click() {
            console.log(self.formPassword);
            self.changeMode('default');
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
      editProfileProperties: this.children.editProfileProperties,
      oldPasswordInput: this.children.oldPasswordInput,
      newPasswordInput: this.children.newPasswordInput,
      confirmNewPasswordInput: this.children.confirmNewPasswordInput,
      buttonEditPassword: this.children.buttonEditPassword,
      buttonEditData: this.children.buttonEditData,
      buttonExit: this.children.buttonExit,
      buttonReturnToDefaultMode: this.children.buttonReturnToDefaultMode,
      buttonSaveData: this.children.buttonSaveData,
      buttonSavePassword: this.children.buttonSavePassword,
    });
  }
}

export type PageProfileType = PageProfile;

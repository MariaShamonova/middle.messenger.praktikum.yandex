import tpl from './profile.hbs';
import './profile.less';
import { PageProfilePropsType } from './types';
import Block from '../../modules/block';
import Avatar from '../../modules/profile/avatar/Avatar';
import ProfileProperty, { ProfilePropertyType } from '../../modules/profile/profileProperty/ProfileProperty';
import properties from './const';
import Input, { InputType } from '../../components/input/Input';
import { InputBlockType, InputValueType } from '../../components/input/types';
import Button from '../../components/button/Button';
import { ButtonBlockType, ButtonValueType, ButtonVariantType } from '../../components/button/types';
import renderDOM from '../../utils/renderDOM';

export default class PageProfile extends Block {
  public props: any;

  public children: any;

  constructor(props: PageProfilePropsType) {
    super('div', props);

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
      }));
      return acc;
    }, []);
    this.children.oldPasswordInput = new Input(
      {
        name: 'oldPassword',
        type: InputValueType.password,
        label: 'Старый пароль',
        placeholder: 'Введите старый пароль',
      },
    );

    this.children.newPasswordInput = new Input(
      {
        name: 'newPassword',
        type: InputValueType.password,
        label: 'Новый пароль',
        placeholder: 'Введите новый пароль',
      },
    );
    this.children.confirmNewPasswordInput = new Input(
      {
        name: 'confirmNewPassword',
        type: InputValueType.password,
        label: 'Новый пароль еще раз',
        placeholder: 'Введите новый пароль еще раз',
      },
    );

    this.children.buttonEditPassword = new Button(
      {
        text: 'Изменить пароль',
        variant: ButtonVariantType.secondary,
        block: ButtonBlockType.fill,
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
        type: ButtonValueType.submit,
        block: ButtonBlockType.fill,
      },
    );
    this.children.buttonSavePassword = new Button(
      {
        text: 'Сохранить',
        type: ButtonValueType.submit,
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

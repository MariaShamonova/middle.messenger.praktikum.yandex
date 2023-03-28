import tpl from './profile.hbs';
import './profile.less';
import { PageProfilePropsType } from './types';
import Block from '../../utils/block';
import Avatar from '../../modules/profile/avatar/Avatar';
import ProfileProperty,
{ ProfilePropertyType } from '../../modules/profile/profileProperty/ProfileProperty';
import Input, { InputType } from '../../components/input/Input';
import { InputBlockType, InputValueType } from '../../components/input/types';
import Button from '../../components/button/Button';
import { ButtonBlockType, ButtonValueType, ButtonVariantType } from '../../components/button/types';
import Form from '../../modules/form/Form';
import renderDOM from '../../helpers/renderDOM';
import Validator from '../../utils/validator';
import ProfileController from '../../controllers/ProfileController';
import withStore from '../../hoc/withStore';
import Store, { State, StoreEvents } from '../../store/Store';
import getProperties from '../../helpers/getUserProperties';
import AuthController from '../../controllers/AuthController';
import RouterLink from '../../router/components/RouterLink';
import { UserResponseType } from '../../api/AuthAPI';
import IconArrowRight from '../../../static/images/arrow-left.svg';
import Notification from '../../components/notification/Notification';
import { NotificationPropsType } from '../../components/notification/types';

class PageProfile extends Block {
  constructor(props: PageProfilePropsType, tagName = 'div') {
    super(props, tagName);
    const self = this;
    this.props.mode = 'default';

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

    this.children.avatar = this.createAvatar();

    this.children.notification = PageProfile.createNotification(this.props.notification);

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
            async click(evn: Event) {
              evn.preventDefault();
              const formElement: HTMLFormElement = this.closest('form')!;
              await ProfileController.changeUserPassword(formElement);
              self.changeMode('default');
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
      fields: getProperties(this.props.user.data)
        .reduce((acc: InputType[], curr) => {
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
            async click(evn: Event) {
              evn.preventDefault();
              const formElement: HTMLFormElement = this.closest('form')!;
              await ProfileController.changeUserProfile(formElement);
              self.changeMode('default');
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
    this.children.profileProperties = PageProfile.createUserProperties(this.props.user?.data);
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
        link: new RouterLink({
          text: 'Выйти',
          events: {
            async click() {
              await AuthController.logout();
            },
          },
        }),
      },
    );

    Store.on(StoreEvents.Updated, () => {
      const state = Store.getState();
      // вызываем обновление компонента, передав данные из хранилища
      this.children.notification = PageProfile.createNotification(this.props.notification);
      this.children.profileProperties = PageProfile.createUserProperties(state.user.data);
      this.children.avatar = this.createAvatar();
    });
  }

  static createUserProperties(data: UserResponseType) {
    const properties: any[] = data ? getProperties(data) : [];
    return properties.reduce((acc: ProfilePropertyType[], curr) => {
      acc.push(new ProfileProperty({
        title: curr.title,
        value: curr.value,
      }));
      return acc;
    }, []);
  }

  changeMode(currentMode: string) {
    this.setProps({ mode: currentMode });
    renderDOM('#root', this);
  }

  createAvatar() {
    const self = this;
    return new Avatar({
      id: self.props.user.data.id,
      avatar: self.props.user.data.avatar,
      events: {
        click() {
          const input = document.createElement('input');
          input.type = 'file';
          input.onchange = async () => {
            if (input.files) {
              await ProfileController.changeUserAvatar(input.files[0]);
            }
          };
          input.click();
        },
      },
    });
  }

  static createNotification(notification: NotificationPropsType) {
    return new Notification({
      title: notification.title,
      message: notification.message,
      isOpen: notification.isOpen,
      type: notification.type,
    });
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
      notification: this.children.notification,
      IconArrowRight,
    });
  }
}

function mapUserToProps(state: State) {
  return {
    user: state.user,
    notification: state.notification,
  };
}

export default withStore((state) => mapUserToProps(state))(PageProfile);

import login from '../pages/PageLogin';
import registration from '../pages/PageRegistration';
import chats from '../pages/PageChats';
import profile from '../pages/PageProfile';
import notFound from '../pages/PageNotFound';
import serverError from '../pages/PageServerError';

import template from '../../index.hbs';

import input from '../components/input';
import button from '../components/button';
import dropdown from '../components/dropdown';
import profileProperty from '../modules/profile/profileProperty';
import avatar from '../modules/profile/avatar';
import lastMessage from '../modules/chats/components/lastMessage';

import { ButtonBlockType, ButtonType, ButtonVariantType } from '../components/button/types';
import { InputBlockType, InputSizeType, InputType } from '../components/input/types';

function LoginPage() {
  return template({
    page: login({
      title: 'Авторизация',
      loginInput: input({
        id: 'login',
        label: 'Логин',
        placeholder: 'Введите логин',
      }),
      passwordInput: input({
        id: 'password',
        type: InputType.password,
        label: 'Пароль',
        placeholder: 'Введите пароль',
      }),
      buttonAuth: button({
        id: 'auth-button', text: 'Вход', link: '/',
      }),
      linkToRegistration: button({
        id: 'link-to-reg-button',
        text: 'Зарегистрироваться',
        link: '/registration',
        type: ButtonType.button,
        variant: ButtonVariantType.borderless,
      }),
    }),

  });
}

function ChatsPage() {
  return template({
    page: chats({
      lastMessage: lastMessage(
        'last-message',
        'Друзья, у меня для вас особенный выпуск новостей!...',
        'Maria Shamonova',
        '10:34',
        4,
      ),
      dropdownChatActions: dropdown(
        {
          id: 'dropdown-chat-actions',
          buttonIcon: 'more.png',
          options: [{
            id: 'add-user',
            title: 'Добавить пользователя',
            icon: 'plus-circle.png',
          }, {
            id: 'remove-user',
            title: 'Удалить пользователя',
            icon: 'close-circle.png',
          }],
          size: 32,
          position: 'bottom',
        },
      ),
      dropdownAttachments: dropdown(
        {
          id: 'dropdown-attachments',
          buttonIcon: 'paperclip.png',
          options: [{
            id: 'иконка файла',
            title: 'Файл',
            icon: 'file.png',
          },
          {
            id: 'иконка фото',
            title: 'Фото и видео',
            icon: 'image.png',
          },
          {
            id: 'иконка локации',
            title: 'Локация',
            icon: 'location.png',
          }],
        },
      ),
      buttonToProfile: button(
        {
          id: 'link-to-profile-button',
          text: 'Профиль',
          link: '/profile',
          variant: ButtonVariantType.borderless,
        },
      ),
      inputSearchMessages: input({
        id: 'search',
        placeholder: 'Поиск',
        size: InputSizeType.s,
      }),
      inputMessage: input({
        id: 'message',
        placeholder: 'Сообщение',
      }),
      buttonSendMessage: button(
        {
          id: 'send-message-button',
          text: '→',
          link: '/profile',
          type: ButtonType.submit,
          variant: ButtonVariantType.secondary,
        },
      ),
    }),
  });
}

function RegistrationPage() {
  return template({
    page: registration({
      title: 'Регистрация',
      firstNameInput: input({
        id: 'first_name',
        label: 'Имя',
        placeholder: 'Введите имя',
        block: InputBlockType.full,
      }),
      secondNameInput: input(
        {
          id: 'second_name',
          label: 'Фамилия',
          placeholder: 'Введите фамилию',
          block: InputBlockType.full,
        },
      ),
      loginInput: input(
        {
          id: 'login',
          label: 'Логин',
          placeholder: 'Введите логин',
          block: InputBlockType.full,
          required: true,
        },
      ),
      emailInput: input(
        {
          id: 'email',
          label: 'Email',
          placeholder: 'Введите почту',
          block: InputBlockType.full,
        },
      ),
      passwordInput: input(
        {
          id: 'password',
          type: InputType.password,
          label: 'Пароль',
          placeholder: 'Введите пароль',
          block: InputBlockType.full,
          required: true,
        },
      ),
      confirmPasswordInput: input(
        {
          id: 'confirm-password',
          type: InputType.password,
          label: 'Пароль еще раз',
          placeholder: 'Введите пароль еще раз',
          block: InputBlockType.full,
          required: true,
        },
      ),
      phoneInput: input(
        {
          id: 'phone',
          label: 'Телефон',
          placeholder: 'Введите номер телефона',
          block: InputBlockType.full,
        },
      ),
      buttonRegistration: button(
        {
          id: 'registration-button',
          text: 'Создать аккаунт',
          type: ButtonType.submit,
          block: ButtonBlockType.full,
        },
      ),
      linkToAuth: button(
        {
          id: 'link-to-auth-button',
          text: 'Уже есть аккаунт?',
          link: '/login',
          variant: ButtonVariantType.borderless,
        },
      ),
    }),
  });
}

function ProfilePage() {
  const properties = [
    {
      id: 'email',
      title: 'Почта',
      placeholder: 'Введите почту',
      value: 'shamonova@yandex.ru',
    },
    {
      id: 'login',
      title: 'Логин',
      placeholder: 'Введите логин',
      value: 'shamonova',
    },
    {
      id: 'first_name',
      title: 'Имя',
      placeholder: 'Введите имя',
      value: 'Мария',
    },
    {
      id: 'second_name',
      title: 'Фамилия',
      placeholder: 'Введите фамилию',
      value: 'Шамонова',
    },
    {
      id: 'display_name',
      title: 'Имя в чате',
      placeholder: 'Введите имя в чате',
      value: 'honey.shamon',
    },
    {
      id: 'phone',
      title: 'Телефон',
      placeholder: 'Введите телефон',
      value: '89217425588',
    },
  ];
  const mode = 'default';
  return template({
    page: profile({
      mode,
      avatar: avatar(''),
      profileProperties: properties.reduce((acc, curr) => {
        let currAcc = acc;
        currAcc += profileProperty({ id: curr.id, title: curr.title, value: curr.value });
        return currAcc;
      }, ''),
      editProfileProperties: properties.reduce((acc, curr) => {
        let currAcc = acc;
        currAcc += input({
          id: curr.id,
          label: curr.title,
          placeholder: curr.placeholder,
          value: curr.value,
        });
        return currAcc;
      }, ''),
      oldPasswordInput: input(
        {
          id: 'oldPassword',
          type: InputType.password,
          label: 'Старый пароль',
          placeholder: 'Введите старый пароль',
        },
      ),
      newPasswordInput: input(
        {
          id: 'newPassword',
          type: InputType.password,
          label: 'Новый пароль',
          placeholder: 'Введите новый пароль',
        },
      ),
      confirmNewPasswordInput: input(
        {
          id: 'confirmNewPassword',
          type: InputType.password,
          label: 'Новый пароль еще раз',
          placeholder: 'Введите новый пароль еще раз',
        },
      ),
      buttonEditPassword: button(
        {
          id: 'edit-password-button',
          text: 'Изменить пароль',
          variant: ButtonVariantType.secondary,
        },
      ),
      buttonEditData: button(
        {
          id: 'edit-data-button',
          text: 'Редактировать профиль',
        },
      ),
      buttonExit: button(
        {
          id: 'exit-button',
          text: 'Выйти',
          variant: ButtonVariantType.borderless,
        },
      ),
      buttonReturnToDefaultMode: button(
        {
          id: 'return-to-default-button',
          text: 'Отменить',
          type: ButtonType.reset,
          variant: ButtonVariantType.secondary,
        },
      ),
      buttonSaveData: button(
        {
          id: 'save-data-button',
          text: 'Сохранить',
          type: ButtonType.submit,
        },
      ),
      buttonSavePassword: button(
        {
          id: 'save-password-button',
          text: 'Сохранить',
          type: ButtonType.submit,
        },
      ),
    }),
  });
}

function NotFoundPage() {
  return template({ page: notFound({}) });
}

function ServerErrorPage() {
  return template({ page: serverError({}) });
}

export interface RoutesType {
  [key: string]: {
    template: () => string
    title: string
  };
}

const routes: RoutesType = {
  '/': {
    template: ChatsPage,
    title: 'Chats',
  },
  '/login': {
    template: LoginPage,
    title: 'Login',
  },
  '/registration': {
    template: RegistrationPage,
    title: 'Registration',
  },
  '/profile': {
    template: ProfilePage,
    title: 'Profile',
  },
  '/404': {
    template: NotFoundPage,
    title: '404',
  },
  '/500': {
    template: ServerErrorPage,
    title: '500',
  },
};

export default routes;

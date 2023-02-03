import PageLogin, { PageLoginType } from '../pages/PageLogin/PageLogin';
import PageRegistration, { PageRegistrationType } from '../pages/PageRegistration/PageRegistration';
import PageProfile, { PageProfileType } from '../pages/PageProfile/PageProfile';
import PageNotFound, { PageNotFoundType } from '../pages/PageNotFound/PageNotFound';
import PageServerError, { PageServerErrorType } from '../pages/PageServerError/PageServerError';
import PageChats, { PageChatsType } from '../pages/PageChats/PageChats';

function LoginPage() {
  return new PageLogin({
    title: 'Авторизация',
    form: {
      login: '',
      password: '',
    },
  });
}

function ChatsPage() {
  return new PageChats({});
}

function RegistrationPage() {
  return new PageRegistration({
    title: 'Регистрация',
  });
}

function ProfilePage() {
  const mode = 'default';
  return new PageProfile({
    mode,
  });
}

function NotFoundPage() {
  return new PageNotFound({});
}

function ServerErrorPage() {
  return new PageServerError({});
}

export interface RoutesType {
  [key: string]: {
    template: () => PageProfileType | PageChatsType | PageLoginType | PageNotFoundType | PageRegistrationType | PageServerErrorType
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

import PageLogin, { PageLoginTypeOf } from '../pages/PageLogin/PageLogin';
import PageRegistration, { PageRegistrationTypeOf } from '../pages/PageRegistration/PageRegistration';
import PageProfile, { PageProfileTypeOf } from '../pages/PageProfile/PageProfile';
import PageNotFound, { PageNotFoundTypeOf } from '../pages/PageNotFound/PageNotFound';
import PageServerError, { PageServerErrorTypeOf } from '../pages/PageServerError/PageServerError';
import PageChats, { PageChatsTypeOf } from '../pages/PageChats/PageChats';
import Router from './Router';
import registerHelpers from '../utils/registerHelpers';

registerHelpers();

export type RoutesType = PageProfileTypeOf |
PageChatsTypeOf |
PageLoginTypeOf |
PageNotFoundTypeOf |
PageRegistrationTypeOf |
PageServerErrorTypeOf;

Router.use('/', 'Chats', PageChats)
  .use('/login', 'Login', PageLogin)
  .use('/registration', 'Registration', PageRegistration)
  .use('/profile', 'Profile', PageProfile)
  .use('/404', 'NotFound', PageNotFound)
  .use('/500', 'ServerError', PageServerError)
  .start();

export default Router;

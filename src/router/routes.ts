import PageLogin from '../pages/PageLogin/PageLogin';
import PageRegistration from '../pages/PageRegistration/PageRegistration';
import PageProfile from '../pages/PageProfile/PageProfile';
import PageNotFound from '../pages/PageNotFound/PageNotFound';
import PageServerError from '../pages/PageServerError/PageServerError';
import PageChats from '../pages/PageChats/PageChats';
import Router from './Router';
import registerHelpers from '../helpers/registerHelpers';

registerHelpers();

Router.use('/messenger', 'Chats', PageChats)
  .use('/', 'Login', PageLogin, false)
  .use('/sign-up', 'Registration', PageRegistration, false)
  .use('/settings', 'Profile', PageProfile)
  .use('/404', 'NotFound', PageNotFound)
  .use('/500', 'ServerError', PageServerError)
  .start();

export default Router;

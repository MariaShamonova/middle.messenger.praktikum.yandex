import tpl from './header.hbs';
import './header.less';
import { routes } from '../../router/routes';

export default () => {
	return tpl({routes, pathname: window.location.pathname});
}

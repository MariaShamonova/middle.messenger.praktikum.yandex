import tpl from './profileProperty.hbs';
import './profileProperty.less';

export default (id, title, value) => {
	return tpl({ id, title, value});
}

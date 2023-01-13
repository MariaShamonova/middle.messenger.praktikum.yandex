import tpl from './button.hbs';
import './button.less';

export default (id, text='', type='primary', link='', size='m', block=true) => {
	return tpl({ id, text, type, link, size, block: block ? 'block': ''});
}

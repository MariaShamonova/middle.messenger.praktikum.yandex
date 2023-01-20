import tpl from './button.hbs';
import './button.less';

export default (id, text='', type='button', variant='primary', link='', size='m', block=true) => {
	return tpl({ id, text, type, variant, link, size, block: block ? 'block': ''});
}

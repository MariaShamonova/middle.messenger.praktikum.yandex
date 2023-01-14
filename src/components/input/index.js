import tpl from './input.hbs';
import './input.less';

export default (id, type, label, placeholder,value = '', size='m', block=true, required=false) => {
	return tpl({ id, type, label, placeholder, value, size, block: block ? 'block' :  '', required});
}

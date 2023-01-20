import tpl from './lastMessage.hbs';
import './lastMessage.less';

export default (id, text='', name= '', date = '', counter, avatarPath) => {
	return tpl({ id, text, name, date, counter, avatarPath});
}

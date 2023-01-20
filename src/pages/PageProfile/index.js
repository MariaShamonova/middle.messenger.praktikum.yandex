import tpl from './profile.hbs';
import './profile.less';
import { handlerButtonClick } from '../../utils/handlerButtonCick'

function changeMode(evn, props, mode){
	evn.preventDefault()
	const root  = document.getElementById('root')
	root.innerHTML = tpl({...props, mode});
}

export default (props = {}) => {
	handlerButtonClick("#return-to-default-button", changeMode, props, 'default', )
	handlerButtonClick("#edit-data-button", changeMode, props, 'editData', )
	handlerButtonClick("#edit-password-button",  changeMode, props, 'editPassword', )

	return tpl(props);
}

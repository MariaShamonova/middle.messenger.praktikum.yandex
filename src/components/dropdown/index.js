import tpl from './dropdown.hbs';
import './dropdown.less';
import { uploadFile } from '../../utils/uploadFile'
import { handlerButtonClick } from '../../utils/handlerButtonCick'

let isOpen = false
function toggleDropdownMenu(evn, props){
  evn.preventDefault()

  isOpen = !isOpen
	const dropdown  = document.getElementById(props.id)
  dropdown.innerHTML = tpl({...props, isOpen});
}

function selectOption(evn, buttonId){
  evn.preventDefault()

  const button = document.getElementById(buttonId)
  button.click()

  uploadFile(() => {})
}

export default (id, buttonIcon, options, size = 32, position = 'top') => {
  handlerButtonClick('#'+id+'-button', toggleDropdownMenu, { id, buttonIcon, options, size, position })
  handlerButtonClick('#'+id+'-list>.dropdown-list__item', selectOption, id+'-button')

	return tpl({ id, buttonIcon, options, size, position, isOpen  });
}

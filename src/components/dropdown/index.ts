import tpl from './dropdown.hbs';
import './dropdown.less';
import uploadFile from '../../utils/uploadFile';
import handlerButtonClick from '../../utils/handlerButtonClick';
import { DropdownPropsType } from './types';

let isOpen = false;

function toggleDropdownMenu(evn: Event, props: DropdownPropsType) {
  evn.preventDefault();

  isOpen = !isOpen;
  const dropdown = document.getElementById(props.id)!;
  dropdown.innerHTML = tpl({ ...props, isOpen });
}

function selectOption(evn: Event, props: DropdownPropsType) {
  evn.preventDefault();

  handlerButtonClick(props.id, uploadFile, (file: File) => {
    console.log('upload file', file);
  });
}

export default (
  {
    id, buttonIcon, options, size = 32, position = 'bottom',
  }: DropdownPropsType,
) => {
  const props = {
    id, buttonIcon, options, size, position,
  };
  handlerButtonClick(`#${id}-button`, toggleDropdownMenu, props);
  handlerButtonClick(`#${id}-list>.dropdown-list__item`, selectOption, { id: `${id}-button` });

  return tpl(props);
};

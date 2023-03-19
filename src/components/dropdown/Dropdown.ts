import tpl from './dropdown.hbs';
import './dropdown.less';
// import uploadFile from '../../utils/uploadFile';
// import handlerButtonClick from '../../utils/handlerButtonClick';
import { DropdownPropsType } from './types';
import Block from '../../utils/block';

// const isOpen = false;

// function toggleDropdownMenu(evn: Event, props: DropdownPropsType) {
//   evn.preventDefault();
//
//   isOpen = !isOpen;
//   const dropdown = document.getElementById(props.id)!;
//   dropdown.innerHTML = tpl({ ...props, isOpen });
// }
//
// function selectOption(evn: Event, props: DropdownPropsType) {
//   evn.preventDefault();
//
//   handlerButtonClick(props.id, uploadFile, (file: File) => {
//     console.log('upload file', file);
//   });
// }

export default class Dropdown extends Block {
  public props: any;

  constructor({
    buttonIcon, options, size = 32, position = 'bottom',
  }: DropdownPropsType) {
    const props = {
      buttonIcon, options, size, position,
    };
    // Создаём враппер DOM-элемент button
    super('div', props);
  }

  render() {
    // handlerButtonClick(`#${id}-button`, toggleDropdownMenu, this.props);
    // handlerButtonClick(`#${id}-list>.dropdown-list__item`, selectOption, { id: `${id}-button` });

    return this.compile(tpl, this.props);
  }
}

export type DropdownType = Dropdown;

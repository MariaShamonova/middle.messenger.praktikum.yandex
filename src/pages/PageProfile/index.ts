import tpl from './profile.hbs';
import './profile.less';
import handlerButtonClick from '../../utils/handlerButtonClick';
import { PageProfilePropsType } from './types';

function changeMode(evn: Event, props: PageProfilePropsType) {
  evn.preventDefault();
  const root = document.getElementById('root')!;
  root.innerHTML = tpl(props);
}

export default (props: PageProfilePropsType) => {
  handlerButtonClick('#return-to-default-button', changeMode, { ...props, mode: 'default' });
  handlerButtonClick('#edit-data-button', changeMode, { ...props, mode: 'editData' });
  handlerButtonClick('#edit-password-button', changeMode, { ...props, mode: 'editPassword' });

  return tpl(props);
};

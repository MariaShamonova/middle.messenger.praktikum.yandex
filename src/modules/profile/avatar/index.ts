import tpl from './avatar.hbs';
import './avatar.less';
import uploadFile from '../../../utils/uploadFile';
import handlerButtonCick from '../../../utils/handlerButtonClick';

function onChangeInput() {
  console.log('upload file');
}

export default (path: string) => {
  handlerButtonCick('#avatar', uploadFile, { onChangeInput });
  return tpl({ path });
};

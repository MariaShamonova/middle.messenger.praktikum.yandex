import tpl from './lastMessage.hbs';
import './lastMessage.less';

export default (
  id: number | string,
  text: string = '',
  name: string = '',
  date: string = '',
  counter: string | number = 0,
  avatarPath: string = '',
) => tpl({
  id, text, name, date, counter, avatarPath,
});

import tpl from './login.hbs';
import './login.less';
import { PageLoginPropsType } from './types';

export default (props: PageLoginPropsType) => {
  document.addEventListener('click', (evn: MouseEvent) => {
    const target = evn.target as HTMLInputElement;
    const targetIsMounted = target.closest('#auth-button');

    if (targetIsMounted) {
      document.location.href = '/';
    }
  });

  return tpl(props);
};

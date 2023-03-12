import tpl from './header.hbs';
import './header.less';
import router from '../../router/routes';
import Block from '../../modules/block';
import { HeaderPropsType } from './types';
import RouterLink from '../../router/components/RouterLink';
import Route from '../../router/Route';
import Router from '../../router/Router';

export default class Header extends Block {
  constructor(props: HeaderPropsType) {
    super('div', props);

    this.children.links = router.routes.reduce((acc: RouterLink[], curr: Route) => {
      acc.push(new RouterLink({
        text: curr.title,
        events: {
          click() {
            Router.go(curr.pathname);
          },
        },
      }));
      return acc;
    }, []);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export type HeaderType = Header;

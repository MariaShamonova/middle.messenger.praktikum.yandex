import tpl from './header.hbs';
import './header.less';
import router from '../../router/routes';
import Block from '../../utils/Block';
import { HeaderPropsType } from './types';
import RouterLink, { RouterLinkType } from '../../router/components/RouterLink';
import Route from '../../router/Route';
import Router from '../../router/Router';
// import registerHelpers from '../../helpers/registerHelpers';
//
// registerHelpers();
export default class Header extends Block {
  constructor(props: HeaderPropsType, tagName = 'div') {
    super(props, tagName);

    this.children.links = router.routes.reduce((acc: RouterLinkType[], curr: Route) => {
      acc.push(new RouterLink({
        text: curr.title,
        events: {
          click() {
            Router.go(curr.pathname);
          },
        },
      }));
      return acc;
    }, [] as RouterLinkType[]);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

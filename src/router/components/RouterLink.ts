import tpl from './routerLink.hbs';
import './routerLink.less';
import Block from '../../utils/block';
import { RouterLinkPropsType } from './types';
import { withStore } from '../../hoc/withStore';

class RouterLink extends Block {
  constructor(props: RouterLinkPropsType) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default withStore(() => {})(RouterLink);

import tpl from './notFound.hbs';
import './notFound.less';
import { PageNotFoundPropsType } from './types';
import Block from '../../utils/Block';
import withStore from '../../hoc/withStore';

class PageNotFound extends Block {
  constructor (props: PageNotFoundPropsType, tagName = 'div') {
    super(props, tagName);
  }

  render () {
    return this.compile(tpl, this.props);
  }
}

export default withStore(() => {})(PageNotFound);

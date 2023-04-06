import tpl from './serverError.hbs';
import './serverError.less';
import { PageServerErrorPropsType } from './types';
import Block from '../../utils/Block';
import withStore from '../../hoc/withStore';

class PageServerError extends Block {
  constructor (props: PageServerErrorPropsType, tagName = 'div') {
    super(props, tagName);
  }

  render () {
    return this.compile(tpl, this.props);
  }
}

export default withStore(() => {})(PageServerError);

import tpl from './notFound.hbs';
import './notFound.less';
import { PageNotFoundPropsType } from './types';
import Block from '../../modules/block';
import connect from '../../hoc/connect';

class PageNotFound extends Block {
  public props: any;

  constructor(props: PageNotFoundPropsType) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const withNonFound = connect(() => ({}));
export default withNonFound(PageNotFound);

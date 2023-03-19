import tpl from './serverError.hbs';
import './serverError.less';
import { PageServerErrorPropsType } from './types';
import Block from '../../modules/block';
import connect from '../../hoc/connect';

class PageServerError extends Block {
  public props: any;

  constructor(props: PageServerErrorPropsType) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const withServerError = connect(() => ({}));
export default withServerError(PageServerError);

import tpl from './serverError.hbs';
import './serverError.less';
import { PageServerErrorPropsType } from './types';
import Block from '../../modules/block';

export default class PageServerError extends Block {
  public props: any;

  constructor(props: PageServerErrorPropsType) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
export type PageServerErrorType = PageServerError;

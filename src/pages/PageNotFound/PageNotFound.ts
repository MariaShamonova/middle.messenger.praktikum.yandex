import tpl from './notFound.hbs';
import './notFound.less';
import { PageNotFoundPropsType } from './types';
import Block from '../../modules/block';

export default class PageNotFound extends Block {
  public props: any;

  constructor (props: PageNotFoundPropsType) {
    super('div', props);
  }

  render () {
    return this.compile(tpl, this.props);
  }
}

export type PageNotFoundType = PageNotFound;
export type PageNotFoundTypeOf = typeof PageNotFound;

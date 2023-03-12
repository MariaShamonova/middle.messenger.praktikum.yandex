import isEqual from '../utils/isEqual';
import renderDOM from '../utils/renderDOM';
import { RoutesType } from './routes';

export default class Route {
  private readonly _title: string;

  private _pathname: string;

  private _block: any;

  private _blockClass: unknown;

  private _props: any;

  constructor(pathname: string, title: string, view: RoutesType, props: { rootQuery: string }) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
    this._title = title;
  }

  get title(): string {
    return this._title;
  }

  get pathname() {
    return this._pathname;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
    } else {
      this._block.show();
    }
    renderDOM(this._props.rootQuery, this._block);
  }
}

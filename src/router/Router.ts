import Route from './Route';
import { RoutesType } from './routes';

class Router {
  private static __instance: Router;

  private readonly _rootQuery: any;

  // private _routes: Route[];
  private _currentRoute: any;

  private history: any;

  public routes: Route[];

  constructor(rootQuery: string) {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
    this.routes = [];

    Router.__instance = this;
  }

  use(pathname: string, title: string, block: RoutesType) {
    const route = new Route(pathname, title, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this.go(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    if (route) {
      route.render();
    }
  }

  go(pathname: string) {
    this.history.pushState({ name: pathname }, pathname, pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router('#root');

import { RoutesType } from '../router/routes';

export default function getPageByPathname(pathname: string, routes: RoutesType) {
  if (pathname in routes) {
    return routes[pathname];
  }
  return routes['/404'];
}

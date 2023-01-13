export function getPageByPathname (pathname, routes){
    if ( pathname in routes) {
      return routes[pathname]
    } else {
      return routes['/404']
    }
}
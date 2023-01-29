import getPageByPathname from './src/utils/getPageByPathname';
import header from './src/layouts/header';
import { registerHelpers } from './src/utils/registerHelpers';
import routes from './src/router/routes';

registerHelpers();
const result = getPageByPathname(window.location.pathname, routes).template();
const rootElement = document.getElementById('root')!;
const headerElement = document.getElementById('header')!;
rootElement.innerHTML = result;

headerElement.innerHTML = header();

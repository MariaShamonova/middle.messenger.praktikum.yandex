import getPageByPathname from './src/utils/getPageByPathname';
import header from './src/layouts/header';
import registerHelpers from './src/utils/registerHelpers';
import routes from './src/router/routes';
import renderDOM from './src/utils/renderDOM';

registerHelpers();
const result = getPageByPathname(window.location.pathname, routes).template();
renderDOM('#root', result);

const headerElement = document.getElementById('header')!;
headerElement.innerHTML = header();

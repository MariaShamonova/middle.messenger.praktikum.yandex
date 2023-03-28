import Header from './src/layouts/header/Header';

const headerElement = document.getElementById('header')!;
const header = new Header({});
headerElement.appendChild(header.getContent());

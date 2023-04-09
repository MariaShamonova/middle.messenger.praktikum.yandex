import Header from './src/layouts/header/Header';
import './src/assets/styles/styles.css';

const headerElement = document.getElementById('header')!;
const header = new Header({});
headerElement.appendChild(header.getContent());

import tpl from './serverError.hbs';
import './serverError.less';
import { PageServerErrorPropsType } from './types';

export default (props: PageServerErrorPropsType) => tpl(props);

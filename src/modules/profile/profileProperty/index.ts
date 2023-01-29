import tpl from './profileProperty.hbs';
import './profileProperty.less';
import { ProfilePropertyPropsType } from './types';

export default ({ id, title, value }: ProfilePropertyPropsType) => tpl({ id, title, value });

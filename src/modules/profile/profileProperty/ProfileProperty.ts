import tpl from './profileProperty.hbs';
import './profileProperty.less';
import { ProfilePropertyPropsType } from './types';
import Block from '../../../utils/Block';

export default class ProfileProperty extends Block {
  constructor (props: ProfilePropertyPropsType, tagName = 'div') {
    super(props, tagName);
  }

  render () {
    return this.compile(tpl, this.props);
  }
}

export type ProfilePropertyType = ProfileProperty;

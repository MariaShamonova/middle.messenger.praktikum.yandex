import tpl from './profileProperty.hbs';
import './profileProperty.less';
import { ProfilePropertyPropsType } from './types';
import Block from '../../block';

export default class ProfileProperty extends Block {
  constructor(props: ProfilePropertyPropsType) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export type ProfilePropertyType = ProfileProperty;

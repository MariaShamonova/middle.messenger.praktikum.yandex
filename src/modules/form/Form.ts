import Block from '../../utils/Block';
import tml from './form.hbs';
import { FormPropsType } from './types';
import './form.less';

export default class Form extends Block {
  public submitButton: HTMLElement;

  public passwordInput: HTMLElement | null;

  public confirmPasswordInput: HTMLElement | null;

  public inputs: NodeListOf<HTMLInputElement>;

  constructor(props: FormPropsType, tagName = 'form') {
    super(props, tagName);
    this.children.submitButton = props.submitButton;
    this.children.fields = props.fields;
    this.submitButton = this.children.submitButton.element;
    this.submitButton.classList.add('disabled');
    this.inputs = this.element.querySelectorAll('input');
    this.passwordInput = this.element.querySelector('#password');
    this.confirmPasswordInput = this.element.querySelector('#confirm_password');
  }

  isEqualPassword() {
    return this.passwordInput
      && this.confirmPasswordInput
      && (this.passwordInput as HTMLInputElement).value
      === (this.confirmPasswordInput as HTMLInputElement).value;
  }

  render(): DocumentFragment {
    return this.compile(tml, {
      title: this.props.title,
      fields: this.props.fields,
      submitButton: this.props.submitButton,
      secondaryButton: this.props.secondaryButton,
      borderlessButton: this.props.borderlessButton,
      action: this.props.action,
      confirmMessage: this.props.confirmMessage,
    });
  }
}

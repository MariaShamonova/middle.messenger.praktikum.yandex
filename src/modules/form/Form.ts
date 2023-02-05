import Block from '../block';
import tml from './form.hbs';
import { FormPropsType } from './types';
import './form.less';
import { validator } from '../../utils/validator';

function setErrorMessage(label: HTMLLabelElement, text: string) {
  const errorBlockPassword = label.querySelector('.error-message');
  if (errorBlockPassword) {
    errorBlockPassword.textContent = text;
  }
}

export default class Form extends Block {
  public submitButton: HTMLElement;

  public passwordInput: HTMLElement | null;

  public confirmPasswordInput: HTMLElement | null;

  public inputs: NodeListOf<HTMLInputElement>;

  public action: (form: { [key: string]: string }) => void;

  constructor(props: FormPropsType) {
    super('form', props);
    this.action = props.action;
    this.children.submitButton = props.submitButton;
    this.children.fields = props.fields;
    this.submitButton = this.children.submitButton.element;
    this.submitButton.classList.add('disabled');
    this.inputs = this.element.querySelectorAll('input');
    this.passwordInput = this.element.querySelector('#password');
    this.confirmPasswordInput = this.element.querySelector('#confirm_password');

    this._addLocalEvents();
  }

  _addLocalEvents(): void {
    const self: Form = this;

    if (this.inputs) {
      this.inputs.forEach((input) => {
        function onBlur() {
          const isValideForm = self.validateForm();

          if (self.confirmPasswordInput
                        && (self.confirmPasswordInput as HTMLInputElement).value.length
                        && !self.isEqualPassword()
                        && (input === self.confirmPasswordInput || input === self.passwordInput)) {
            const errorBlock = input.parentElement?.querySelector('.error-message');
            if (errorBlock) {
              errorBlock.textContent = 'Пароли не совпадают';
            }
          } else if (self.isEqualPassword()) {
            const passwordParentElement = self.passwordInput as HTMLLabelElement;
            setErrorMessage(passwordParentElement, '');
            const confirmPasswordParentElement = self.confirmPasswordInput as HTMLLabelElement;
            setErrorMessage(confirmPasswordParentElement, '');
          }
          if (!isValideForm) {
            self.submitButton.classList.add('disabled');
          } else {
            self.submitButton.classList.remove('disabled');
          }
        }

        input.addEventListener('blur', onBlur);
      });
    }

    if (this.submitButton) {
      this.submitButton.addEventListener('click', (evn: Event) => {
        evn.preventDefault();
        const isValidForm = self.validateForm(true);
        if (isValidForm) {
          const form = self.getFormValues();
          this.action(form);
        }
      });
    }
  }

  isEqualPassword() {
    return this.passwordInput
            && this.confirmPasswordInput
            && (this.passwordInput as HTMLInputElement).value
            === (this.confirmPasswordInput as HTMLInputElement).value;
  }

  getFormValues() {
    return Array.from(this.inputs).reduce((
      acc: { [key: string]: string },
      input: HTMLInputElement,
    ) => {
      acc[input.name] = input.value;
      return acc;
    }, {});
  }

  validateForm(submit: boolean = false): boolean {
    let isValid: boolean = true;
    if (this.inputs) {
      for (let index = 0; index < this.inputs.length; index += 1) {
        const {
          name,
          value,
          required,
          parentElement,
        }: {
          name: string
          value: string
          required: boolean
          parentElement: HTMLElement | null
        } = this.inputs[index];
        if (submit && required && value === '') {
          if (parentElement) {
            setErrorMessage(parentElement as HTMLLabelElement, 'Обязательное поле');
          }

          isValid = false;
        }

        if (name && validator[name]) {
          const validMessage = validator[name].match(value);

          if (validMessage) {
            if (submit) {
              isValid = false;
            } else {
              return false;
            }
          }
          if (index === this.inputs.length - 1 && validMessage) {
            this.submitButton?.classList.remove('disabled');
          }
        }
      }
    }

    return isValid;
  }

  render(): DocumentFragment {
    return this.compile(tml, {
      title: this.props.title,
      fields: this.props.fields,
      submitButton: this.props.submitButton,
      secondaryButton: this.props.secondaryButton,
      borderlessButton: this.props.borderlessButton,
      action: this.props.action,
    });
  }
}

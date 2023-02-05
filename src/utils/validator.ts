export interface RulesType {
  [key: string]: {
    regex: RegExp
    message: string
    match: (value: string) => string
  };
}

function matchReg(value: string, regex: RegExp, message: string): string {
  const isValidValue = !!value.match(regex);
  return isValidValue ? '' : message;
}

const validePassword = {
  regex: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[\da-zA-Z-#!$@%^&*_+~=:;?]{8,40}$/g,
  message: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
  match(value: string) {
    return matchReg(value, this.regex, this.message);
  },
};

export const validator: RulesType = {
  first_name: {
    regex: /^([А-Я]{1}[а-яё]{1,}|[A-Z]{1}[a-z]{1,})$/,
    message: ` латиница или кириллица, первая буква должна быть заглавной,
      без пробелов и без цифр, нет спецсимволов (допустим только дефис).`,
    match(value: string) {
      return matchReg(value, this.regex, this.message);
    },
  },
  second_name: {
    regex: /^([А-Я]{1}[а-яё]{1,}|[A-Z]{1}[a-z]{1,})$/,
    message: ` латиница или кириллица, первая буква должна быть заглавной,
      без пробелов и без цифр, нет спецсимволов (допустим только дефис)`,
    match(value: string) {
      return matchReg(value, this.regex, this.message);
    },
  },
  login: {
    regex: /^(?!\d+$)[\da-zA-Z_-]+$/g,
    message: `от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них,
    без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)`,
    match(value: string) {
      return matchReg(value, this.regex, this.message);
    },
  },
  email: {
    regex: /^[a-zA-Z-.]+@[a-z]+\.[a-z]{2,3}$/,
    message: `латиница, может включать цифры и спецсимволы вроде дефиса,
    обязательно должна быть «собака» (@) и точка после неё,
    но перед точкой обязательно должны быть буквы`,
    match(value: string) {
      return matchReg(value, this.regex, this.message);
    },
  },
  phone: {
    regex: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,15}(\s*)?$/,
    message: 'от 10 до 15 символов, состоит из цифр, может начинается с плюса',
    match(value: string) {
      return matchReg(value, this.regex, this.message);
    },
  },
  password: validePassword,
  newPassword: validePassword,
};

function setErrorMessage(label: HTMLLabelElement, text: string) {
  const errorBlockPassword = label.querySelector('.error-message');
  if (errorBlockPassword) {
    errorBlockPassword.textContent = text;
  }
}

export default class Validator {
  static validateForm(form: HTMLFormElement): boolean {
    const isValid: boolean = true;

    const inputs = form.querySelectorAll('input');
    const buttonSubmit = form.querySelector('button[type="submit"]');
    if (inputs) {
      for (let index = 0; index < inputs.length; index += 1) {
        const isValidInput = this.validateInput(inputs[index].value, inputs[index]);
        if (index === inputs.length - 1 && isValidInput) {
          buttonSubmit?.classList.remove('disabled');
        } else {
          buttonSubmit?.classList.add('disabled');
        }
      }
    }

    return isValid;
  }

  static validateInput(
    value: string,
    inputElement: HTMLInputElement | null,
    evn?: Event,
    submit: boolean = false,
  ) {
    const input = ((inputElement || (evn as Event).target) as HTMLInputElement);

    if (input.required && value === '') {
      if (input.parentElement) {
        setErrorMessage(input.parentElement as HTMLLabelElement, 'Обязательное поле');
      }

      return false;
    }

    if (input.name && validator[input.name]) {
      const validMessage = validator[input.name].match(value);
      if (validMessage) {
        return false;
      }
    }
    if (!submit) {
      const form = input.closest('form') as HTMLFormElement;
      const inputs = form.querySelectorAll('input');
      const buttonSubmit = form.querySelector('button[type="submit"]');
      let isValidForm: boolean = true;
      inputs.forEach((element: HTMLInputElement) => {
        if (element.name
          && validator[element.name]
          && validator[element.name].match(element.value)) {
          isValidForm = false;
        }
      });
      const passwordInput = form.querySelector(
        'input[id="password"]',
      ) as HTMLInputElement;
      const confirmPasswordInput = form.querySelector(
        'input[id="confirm_password"]',
      ) as HTMLInputElement;
      if (passwordInput
        && confirmPasswordInput
        && passwordInput.value !== confirmPasswordInput.value) {
        isValidForm = false;
      }
      if (isValidForm) {
        buttonSubmit?.classList.remove('disabled');
      }
    }
    return true;
  }

  static setErrorValue = (input: HTMLInputElement, text = '') => {
    const label = input.closest('label')!;
    const errorBlock = label.querySelector('.error-message')!;
    errorBlock.textContent = text;
  };

  static validatePasswords(
    passwordInput: HTMLInputElement,
    confirmPasswordInput: HTMLInputElement,
  ) {
    if (passwordInput.value !== confirmPasswordInput.value && confirmPasswordInput.value.length) {
      const text: string = 'Пароли не совпадают';
      this.setErrorValue(passwordInput, text);
      this.setErrorValue(confirmPasswordInput, text);
      return false;
    }
    this.setErrorValue(passwordInput, '');
    this.setErrorValue(passwordInput, '');
    return true;
  }
}

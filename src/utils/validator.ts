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

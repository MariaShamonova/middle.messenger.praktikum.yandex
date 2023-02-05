import tpl from './input.hbs';
import './input.less';
import {
  InputPropsType, InputBlockType, InputSizeType, InputValueType,
} from './types';
import Block from '../../modules/block';
import { validator } from '../../utils/validator';

export default class Input extends Block {
  public input: Element;

  public error: Element;

  public span: Element;

  constructor({
    id,
    name,
    label,
    placeholder,

    value = '',
    type = InputValueType.text,
    size = InputSizeType.m,
    block = InputBlockType.fit,
    required = false,
    events = {},
  }: InputPropsType) {
    const props = {
      id, name, label, placeholder, value, type, size, block, required, events,
    };
    super('input', props);

    [this.span, this.input, this.error] = this.element.children;
    this._addLocalEvents();
  }

  private _addLocalEvents() {
    const self = this;
    if (this.element) {
      const { name }: { name: string } = this.input as HTMLInputElement;
      if (name) {
        this.input.addEventListener('input', () => {
          self._setError('');
        });

        this.input.addEventListener('blur', (evn: Event) => {
          const target = evn.target as HTMLInputElement;

          if (target.value === '' && this.props.required) {
            this._setError('Обязательное поле');
          } else if (validator[name]) {
            const error = validator[name].match(target.value);
            this._setError(error);
          }
        });
      }
    }
  }

  _setError(text: string) {
    const errorBlock: HTMLElement | null = this.element.querySelector('.error-message');
    if (errorBlock) {
      errorBlock.textContent = text;
    }
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export type InputType = Input;

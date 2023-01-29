export enum InputSizeType {
  s = 'small',
  m = 'middle',
}

export enum InputBlockType {
  'fit',
  'full',
}

export enum InputType {
  'text',
  'password',
}

export interface InputPropsType {
  id: string;
  type?: InputType;
  label?: string;
  placeholder: string;
  value?: string;
  size?: InputSizeType;
  block?: InputBlockType;
  required?: boolean;
}

export enum InputSizeType {
  s = 'small',
  m = 'middle',
}

export enum InputBlockType {
  'fit' = 'fit',
  'fill' = 'fill',
}

export enum InputValueType {
  'text',
  'password',
}

export interface InputPropsType {
  name: string;
  type?: InputValueType;
  label?: string;
  placeholder: string;
  value?: string;
  size?: InputSizeType;
  block?: InputBlockType;
  required?: boolean;
}

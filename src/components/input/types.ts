export enum InputSizeType {
  s = 'small',
  m = 'middle',
}

export enum InputBlockType {
  'fit' = 'fit',
  'fill' = 'fill',
}

export enum InputValueType {
  'text' = 'text',
  'password' = 'password',
}

export interface InputPropsType {
  id?: string;
  name?: string;
  type?: InputValueType;
  label?: string;
  placeholder: string;
  value?: string;
  size?: InputSizeType;
  block?: InputBlockType;
  required?: boolean;
  events?: { [key: string]: Function };

}

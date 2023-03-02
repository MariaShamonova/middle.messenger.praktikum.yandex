export enum ButtonValueType {
  'button' = 'button',
  'submit' = 'submit',
  'reset' = 'reset',
}

export enum ButtonVariantType {
  'primary' = 'primary',
  'secondary' = 'secondary',
  'borderless' = 'borderless',
}

export enum ButtonSizeType {
  s = 'small',
  m = 'middle',
}

export enum ButtonBlockType {
  'fit' = 'fit',
  'fill' = 'fill',
}

export interface ButtonPropsType {
  text: string;
  link?: string;
  type?: ButtonValueType;
  variant?: ButtonVariantType;
  size?: ButtonSizeType;
  block?: ButtonBlockType;

  events?: { [key: string]: Function };
}

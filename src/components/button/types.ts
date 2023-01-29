export enum ButtonType {
  'button',
  'submit',
  'reset',
}

export enum ButtonVariantType {
  'primary',
  'secondary',
  'borderless',
}

export enum ButtonSizeType {
  s = 'small',
  m = 'middle',
}

export enum ButtonBlockType {
  'fit',
  'full',
}

export interface ButtonPropsType {
  id: string;
  text: string;
  link?: string;
  type?: ButtonType;
  variant?: ButtonVariantType;
  size?: ButtonSizeType;
  block?: ButtonBlockType;
}

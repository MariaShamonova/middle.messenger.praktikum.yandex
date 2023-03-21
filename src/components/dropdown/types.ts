interface OptionIconType {
  id: string;
  icon: string;
  title: string;
  click: () => void;
}

export interface DropdownPropsType {
  id: string
  button: {
    icon?: string
    text?: string
    alt: string
  }
  options: OptionIconType[],
  size?: number,
  position?: string,
}

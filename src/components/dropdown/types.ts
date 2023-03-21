interface OptionIconType {
  id: string;
  icon: (context: any) => any;
  title: string;
  click: () => void;
}

export interface DropdownPropsType {
  id: string
  button: {
    icon?: (context: any) => any
    text?: string
    alt: string
  }
  options: OptionIconType[],
  size?: number,
  position?: string,
}

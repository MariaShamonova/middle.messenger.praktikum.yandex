interface OptionIconType {
  id: string;
  icon: string;
  title: string;
}

export interface DropdownPropsType {
  buttonIcon: string,
  options: OptionIconType[],
  size?: number,
  position?: string,
}

interface OptionIconType {
  id: string;
  icon: string;
  title: string;
}

export interface DropdownPropsType {
  id: string,
  buttonIcon: string,
  options: OptionIconType[],
  size?: number,
  position?: string,
}

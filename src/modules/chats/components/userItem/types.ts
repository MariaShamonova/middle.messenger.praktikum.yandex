export interface ListUsersPropsType {
  first_name: string;
  second_name: string;
  id: number;
  role: string;
  selected: string

  events?: { [key: string]: Function };
}

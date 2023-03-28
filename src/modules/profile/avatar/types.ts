export interface AvatarProps {
  id: string | number;
  avatar: string;
  events?: { [key: string]: Function };
}

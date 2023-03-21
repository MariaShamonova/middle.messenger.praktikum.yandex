import { UserProfileType } from '../../api/AuthAPI';

export interface PageChatsPropsType {

}

export interface UsersSelectedChatType extends UserProfileType {
  role: string;
  id: number;
}

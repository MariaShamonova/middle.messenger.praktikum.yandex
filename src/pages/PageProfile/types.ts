import { AvatarType } from '../../modules/profile/avatar/Avatar';
import { ProfilePropertyType } from '../../modules/profile/profileProperty/ProfileProperty';
import { ButtonType } from '../../components/button/Button';
import { InputType } from '../../components/input/Input';

export interface PageProfilePropsType {
  mode: string;

}

export interface PageProfileChildType {
  avatar: AvatarType;
  profileProperties: ProfilePropertyType;
  editProfileProperties: ButtonType;
  oldPasswordInput: InputType;
  newPasswordInput: InputType;
  confirmNewPasswordInput: InputType;
  buttonEditPassword: ButtonType;
  buttonEditData: ButtonType;
  buttonExit: ButtonType;
  buttonReturnToDefaultMode: ButtonType;
  buttonSaveData: ButtonType;
  buttonSavePassword: ButtonType;

}

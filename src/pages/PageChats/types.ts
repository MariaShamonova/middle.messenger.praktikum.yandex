import { LastMessageType } from '../../modules/chats/components/lastMessage/LastMessage';
import { DropdownType } from '../../components/dropdown/Dropdown';
import { ButtonType } from '../../components/button/Button';
import { InputType } from '../../components/input/Input';
import Block from '../../modules/block';

export interface PageChatsPropsType {

}

export interface PageChatsChildType {
  lastMessage: LastMessageType;
  dropdownChatActions: Block;
  dropdownAttachments: DropdownType;
  buttonToProfile: ButtonType;
  inputSearchMessages: InputType;
  inputMessage: InputType;
  buttonSendMessage: ButtonType;
}

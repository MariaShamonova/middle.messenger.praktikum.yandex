import Block from '../../modules/block';
import tpl from './chats.hbs';
import './chats.less';
import { PageChatsPropsType } from './types';
import Input from '../../components/input/Input';
import { InputBlockType, InputSizeType } from '../../components/input/types';
import LastMessage,
{ LastMessageType } from '../../modules/chats/components/lastMessage/LastMessage';
import Dropdown from '../../components/dropdown/Dropdown';
import Button from '../../components/button/Button';
import { ButtonValueType, ButtonVariantType } from '../../components/button/types';
import Form from '../../modules/form/Form';
import ChatController, { ChatByUserId } from '../../controllers/ChatController';
import { StatusMessage } from '../../modules/chats/components/lastMessage/types';
import renderDOM from '../../utils/renderDOM';
import Message, { MessageType } from '../../modules/chats/components/message/Message';
import { MessageByUserType } from '../../modules/chats/components/message/types';

interface MessagesType {
  id: number;
  user: string;
  text: string;
  date: string;
  unreadMessage: number;
}

export default class PageChats extends Block {
  public props: any;

  public activeChat: number | null;

  constructor(props: PageChatsPropsType) {
    super('div', props);
    this.activeChat = null;
    const self = this;
    this.props.messages = [
      {
        id: '44',
        user: 'Maria Shamonova',
        text: 'Друзья, у меня для вас особенный выпуск новостей! Здесь нужно обрывать сообщение',
        date: '10:34',
        unreadMessage: '4',
      },
      {
        id: '23',
        user: 'Mark Kozlov',
        text: 'можете использовать в своих коварных целях',
        date: '10:35',
        unreadMessage: '0',
      },
      {
        id: '17',
        user: 'Semen Zabelin',
        text: `Создаешь чаты, находишь смешные картинки для авы,
              а потом из этого делают бейджи) это ли не успех`,
        date: '10:35',
        unreadMessage: '0',
      },
    ];
    this.props.dialogs = [];

    this.children.lastMessage = this.props.messages.reduce((
      acc: LastMessageType[],
      curr: MessagesType,
    ) => {
      acc.push(new LastMessage({
        active: StatusMessage.default,
        userId: curr.id,
        text: curr.text,
        user: curr.user,
        date: curr.date,
        unreadMessage: curr.unreadMessage,
        events: {
          click() {
            self.changeActiveChat(curr.id);
          },
        },
      }));
      return acc;
    }, [] as LastMessageType[]);
    this.children.dropdownChatActions = new Dropdown(
      {
        buttonIcon: 'more.png',
        options: [{
          id: 'add-user',
          title: 'Добавить пользователя',
          icon: 'plus-circle.png',
        }, {
          id: 'remove-user',
          title: 'Удалить пользователя',
          icon: 'close-circle.png',
        }],
        size: 32,
        position: 'bottom',
      },
    );
    this.children.dropdownAttachments = new Dropdown(
      {
        buttonIcon: 'paperclip.png',
        options: [{
          id: 'иконка файла',
          title: 'Файл',
          icon: 'file.png',
        },
        {
          id: 'иконка фото',
          title: 'Фото и видео',
          icon: 'image.png',
        },
        {
          id: 'иконка локации',
          title: 'Локация',
          icon: 'location.png',
        }],
      },
    );

    this.children.buttonToProfile = new Button(
      {
        text: 'Профиль',
        link: '/profile',
        variant: ButtonVariantType.borderless,
      },
    );

    this.children.inputSearchMessages = new Input({
      label: '',
      name: 'search',
      placeholder: 'Поиск',
      size: InputSizeType.s,
      block: InputBlockType.fill,
    });

    this.children.formMessage = new Form({
      fields: [
        new Input({
          label: '',
          name: 'message',
          placeholder: 'Сообщение',
          block: InputBlockType.fill,
          required: true,
        }),
      ],
      submitButton: new Button(
        {
          text: '→',
          type: ButtonValueType.submit,
          variant: ButtonVariantType.secondary,
        },
      ),
      action() {
        console.log('send message');
      },

    });
  }

  renderDialog(dialogs: ChatByUserId[]) {
    this.children.dialogs = dialogs.reduce((acc, curr) => {
      acc.push(new Message({
        text: curr.text,
        date: curr.date,
        user: curr.userId === null ? MessageByUserType.my : MessageByUserType.default,
      }));
      return acc;
    }, [] as MessageType[]);
    //   this.setProps({
    //     dialogs: ,
    //   });
  }

  changeActiveChat(id: number) {
    this.renderDialog(ChatController.getChatByUserId(id));
    renderDOM('#root', this);
  }

  render() {
    return this.compile(tpl, {
      lastMessage: this.children.lastMessage,
      dropdownChatActions: this.children.dropdownChatActions,
      dropdownAttachments: this.children.dropdownAttachments,
      buttonToProfile: this.children.buttonToProfile,
      inputSearchMessages: this.children.inputSearchMessages,
      formMessage: this.children.formMessage,
      dialogs: this.children.dialogs,
    });
  }
}
export type PageChatsType = PageChats;

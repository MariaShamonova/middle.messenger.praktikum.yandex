import Block from '../../utils/block';
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
import ChatController from '../../controllers/ChatController';
import { ChatType, StatusMessage } from '../../modules/chats/components/lastMessage/types';
import renderDOM from '../../helpers/renderDOM';
import Message, { MessageType } from '../../modules/chats/components/message/Message';
import { MessageByUserType } from '../../modules/chats/components/message/types';
import Validator from '../../utils/validator';
import getFormValues from '../../helpers/getFormValues';
import { ChatByUserId } from '../../types/ChatTypes';
import { withStore } from '../../hoc/withStore';
import Store, { MessageResponseType, StoreEvents } from '../../store/Store';
import RouterLink from '../../router/components/RouterLink';
import Router from '../../router/Router';
import formatDate from '../../helpers/formatDate';

interface MessagesType {
  id: number;
  user: string;
  text: string;
  date: string;
  unreadMessage: number;
}

class PageChats extends Block {
  public props: any;

  public activeChat: number | null;

  constructor(props: PageChatsPropsType) {
    super('div', props);

    this.activeChat = null;
    this.props.dialogs = [];

    this.children.lastMessage = PageChats.createChatsList(this.props.chats.data);
    const { selectedChat } = this.props;
    this.children.dialogs = PageChats.createMessagesList(selectedChat ? this.props.chats[selectedChat] : []);

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
        link: new RouterLink({
          text: 'Профиль',
          events: {
            async click() {
              await Router.go('/profile');
            },
          },
        }),
        variant: ButtonVariantType.borderless,
      },
    );
    this.children.buttonCreateChat = new Button(
      {
        text: 'Создать',
        link: new RouterLink({
          text: 'Создать',
          events: {
            async click() {
              ChatController.createChat();
            },
          },
        }),
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
          events: {
            input(evn: Event) {
              const target = evn.target as HTMLInputElement;
              Validator.setErrorValue(target, '');
              const form = target.closest('form')!;
              const buttonSubmit = form.querySelector('button[type="submit"]')!;
              if (target.value) {
                buttonSubmit.classList.remove('disabled');
              } else {
                buttonSubmit.classList.add('disabled');
              }
            },
          },
        }),
      ],
      submitButton: new Button(
        {
          text: '→',
          type: ButtonValueType.submit,
          variant: ButtonVariantType.secondary,
          events: {
            click(evn: Event) {
              evn.preventDefault();
              const formElement: HTMLFormElement = this.closest('form')!;
              ChatController.sendMessage(formElement);
            },
          },
        },
      ),
    });

    // запрашиваем данные у контроллера
    ChatController.getChats();

    Store.on(StoreEvents.Updated, () => {
      const state = Store.getState();
      // вызываем обновление компонента, передав данные из хранилища

      this.children.lastMessage = PageChats.createChatsList(state.chats.data, state.selectedChat);
      if (state.selectedChat !== null) {
        this.children.dialogs = PageChats.createMessagesList(
          state.messages[state.selectedChat]?.data,
        );
      }
    });
  }

  static createChatsList(data: ChatType[], activeId: number | null = null) {
    return data.reduce((
      acc: LastMessageType[],
      curr: ChatType,
    ) => {
      acc.push(new LastMessage({
        active: curr.id === activeId ? StatusMessage.active : StatusMessage.default,
        message: curr,
        events: {
          click() {
            ChatController.selectChat(curr.id);
          },
        },
      }));
      return acc;
    }, [] as LastMessageType[]);
  }

  static createMessagesList(dialogs: MessageResponseType[]) {
    const state = Store.getState();
    return dialogs.reduce((acc, curr) => {
      acc.push(new Message({
        text: curr.content,
        date: formatDate(curr.time),
        user: Number(curr.user_id) === state.user.data.id
          ? MessageByUserType.my
          : MessageByUserType.default,
      }));
      return acc;
    }, [] as MessageType[]);
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

function mapUserToProps(state) {
  return {
    chats: state.chats,
    messages: state.messanges,
  };
}

export default withStore((state) => mapUserToProps(state))(PageChats);

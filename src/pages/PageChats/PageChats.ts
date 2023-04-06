import Block from '../../utils/Block';
import tpl from './chats.hbs';
import './chats.less';
import { PageChatsPropsType, UsersSelectedChatType } from './types';
import Input from '../../components/input/Input';
import { InputBlockType, InputSizeType } from '../../components/input/types';
import LastMessage,
{ LastMessageType }
  from '../../modules/chats/components/lastMessage/LastMessage';
import Dropdown from '../../components/dropdown/Dropdown';
import Button from '../../components/button/Button';
import { ButtonBlockType, ButtonValueType, ButtonVariantType } from '../../components/button/types';
import Form from '../../modules/form/Form';
import ChatController from '../../controllers/ChatController';
import { ChatType, StatusMessage } from '../../modules/chats/components/lastMessage/types';
import Message, { MessageType } from '../../modules/chats/components/message/Message';
import { MessageByUserType } from '../../modules/chats/components/message/types';
import Validator from '../../utils/validator';
import withStore from '../../hoc/withStore';
import Store, { MessageResponseType, StoreEvents, State } from '../../store/Store';
import RouterLink from '../../router/components/RouterLink';
import Router from '../../router/Router';
import formatDate from '../../helpers/formatDate';
import Modal from '../../components/modal/Modal';
import Autocomplete from '../../components/autocomplete/Autocomplete';
import ChatUsersController from '../../controllers/ChatUsersController';
import UserItem, { UserItemType } from '../../modules/chats/components/userItem/UserItem';
import IconDots from '../../../static/images/dots-three-vertical.svg';
import IconPaperclip from '../../../static/images/paperclip.svg';
import IconFile from '../../../static/images/file.svg';
import IconImage from '../../../static/images/image.svg';
import IconLocation from '../../../static/images/map-pin.svg';
import IconPlus from '../../../static/images/user-plus.svg';
import IconClose from '../../../static/images/user-minus.svg';
import IconRemove from '../../../static/images/x.svg';
import IconPlane from '../../../static/images/paper-plane-right.svg';
import Notification from '../../components/notification/Notification';
import { NotificationPropsType } from '../../components/notification/types';

class PageChats extends Block {
  public activeChat: number | null;

  constructor (props: PageChatsPropsType, tagName = 'div') {
    super(props, tagName);
    this.props = props;
    this.activeChat = null;
    this.props.dialogs = [];

    this.children.notification = PageChats.createNotification(this.props.notification);
    this.children.lastMessage = PageChats.createChatsList(this.props.chats.data);
    const { selectedChat } = this.props;
    this.children.dialogs = PageChats.createMessagesList(selectedChat
      ? this.props.chats[selectedChat]
      : []);

    this.children.dropdownChatActions = new Dropdown(
      {
        id: 'chat-actions',
        button: {
          icon: IconDots,
          alt: 'Многоточие',
        },
        options: [
          {
            id: 'add-user',
            title: 'Добавить пользователя',
            icon: IconPlus,
            click () {
              ChatController.toggleModalAddUser(true);
            },
          },
          {
            id: 'remove-user',
            title: 'Удалить пользователя',
            icon: IconClose,
            click () {
              ChatController.toggleModalRemoveUser(true);
            },
          }, {
            id: 'remove-chat',
            title: 'Удалить чат',
            type: 'error',
            icon: IconRemove,
            click () {
              ChatController.toggleModalRemoveChat(true);
            },
          }],
        size: 32,
        position: 'bottom',
      },
    );
    this.children.dropdownAttachments = new Dropdown(
      {
        id: 'attachments',
        button: {
          icon: IconPaperclip,
          alt: 'Скрепка',
        },
        options: [
          {
            id: 'иконка файла',
            title: 'Файл',
            icon: IconFile,
            click () {},
          },
          {
            id: 'иконка фото',
            title: 'Фото и видео',
            icon: IconImage,
            click () {},
          },
          {
            id: 'иконка локации',
            title: 'Локация',
            icon: IconLocation,
            click () {},
          }],
      },
    );

    this.children.buttonToProfile = new Button(
      {
        text: 'Профиль',
        link: new RouterLink({
          text: 'Профиль',
          events: {
            async click () {
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
            async click () {
              ChatController.toggleModalCreateChat(true);
            },
          },
        }),
        variant: ButtonVariantType.borderless,
      },
    );

    this.children.modalCreateChat = PageChats.createModalCreateChat(false);
    this.children.modalRemoveChat = PageChats.createModalRemoveChat(false);
    this.children.modalAddUser = PageChats.createModalAddUser(false);
    this.children.modalRemoveUser = this.createModalRemoveUser(false, this.props.selectedUser);

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
            input (evn: Event) {
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
          icon: IconPlane,
          type: ButtonValueType.submit,
          variant: ButtonVariantType.borderless,
          events: {
            click (evn: Event) {
              evn.preventDefault();
              const formElement: HTMLFormElement = this.closest('form')!;
              ChatController.sendMessage(formElement);
              ChatController.resetForm(formElement);
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
      this.children.modalCreateChat = PageChats.createModalCreateChat(state.isOpenModalCreateChat);
      this.children.modalRemoveChat = PageChats.createModalRemoveChat(state.isOpenModalRemoveChat);
      this.children.modalAddUser = PageChats.createModalAddUser(state.isOpenModalAddUser);
      this.children.notification = PageChats.createNotification(this.props.notification);
      this.children.modalRemoveUser = this.createModalRemoveUser(
        state.isOpenModalRemoveUser,
        state.selectedUser,
      );
    });
  }

  static createChatsList (data: ChatType[], activeId: number | null = null) {
    return data.reduce((
      acc: LastMessageType[],
      curr: ChatType,
    ) => {
      acc.push(new LastMessage({
        active: curr.id === activeId ? StatusMessage.active : StatusMessage.default,
        message: curr,
        events: {
          click () {
            ChatController.selectChat(curr.id);
            ChatController.getUsersSelectedChat(curr.id);
          },
        },
      }));
      return acc;
    }, [] as LastMessageType[]);
  }

  static createMessagesList (dialogs: MessageResponseType[]) {
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

  static createModalCreateChat (value: boolean) {
    return new Modal({
      isOpen: value ? 'show' : 'hide',
      title: 'Создать чат',
      body: new Form({
        fields: [
          new Input({
            id: 'title',
            name: 'title',
            placeholder: 'Введите название чата',
            block: InputBlockType.fill,
            events: {
              input (evn: Event) {
                const target = evn.target as HTMLInputElement;
                Validator.setErrorValue(target, '');
              },
              blur (evn: Event) {
                const target = evn.target as HTMLInputElement;
                Validator.validateInput(target.value, null, evn);
              },
            },
          }),
        ],
        submitButton: new Button(
          {
            text: 'Создать',
            block: ButtonBlockType.fill,
            type: ButtonValueType.submit,
            events: {
              async click (evn: Event) {
                evn.preventDefault();
                const formElement: HTMLFormElement = this.closest('form')!;
                await ChatController.createChat(formElement);
              },
            },
          },
        ),
        secondaryButton: new Button(
          {
            text: 'Отменить',
            type: ButtonValueType.reset,
            variant: ButtonVariantType.secondary,
            block: ButtonBlockType.fill,
            events: {
              click () {
                ChatController.toggleModalCreateChat(false);
              },
            },
          },
        ),
      }),
    });
  }

  static createModalRemoveChat (value: boolean) {
    return new Modal({
      isOpen: value ? 'show' : 'hide',
      title: 'Удалить чат',
      body: new Form({
        fields: [],
        confirmMessage: 'Вы уверены, что хотите удалить чат?',
        submitButton: new Button(
          {
            text: 'Удалить',
            block: ButtonBlockType.fill,
            type: ButtonValueType.submit,
            events: {
              async click (evn: Event) {
                evn.preventDefault();

                await ChatController.removeChat();
                ChatController.toggleModalRemoveChat(false);
                await ChatController.getChats();
              },
            },
          },
        ),
        secondaryButton: new Button(
          {
            text: 'Отменить',
            type: ButtonValueType.reset,
            variant: ButtonVariantType.secondary,
            block: ButtonBlockType.fill,
            events: {
              click () {
                ChatController.toggleModalRemoveChat(false);
              },
            },
          },
        ),
      }),
    });
  }

  static createModalAddUser (value: boolean) {
    return new Modal({
      isOpen: value ? 'show' : 'hide',
      title: 'Добавить пользователя',
      body: new Form({
        fields: [new Autocomplete({
          id: 'add-user',

          async getData (login: string) {
            const data = await ChatUsersController.getUserByLogin(login);
            console.log(data);
            return data.map((user) => ({
              ...user,
              title: user.login,
            }));
          },
        })],
        submitButton: new Button(
          {
            text: 'Добавить',
            block: ButtonBlockType.fill,
            type: ButtonValueType.submit,
            events: {
              async click (evn: Event) {
                evn.preventDefault();
                if (evn.defaultPrevented && (evn as PointerEvent).pointerType !== 'mouse') return;
                const formElement: HTMLFormElement = this.closest('form')!;
                await ChatController.addUserToChat(formElement);
                ChatController.toggleModalAddUser(false);
              },
            },
          },
        ),
        secondaryButton: new Button(
          {
            text: 'Отменить',
            type: ButtonValueType.reset,
            variant: ButtonVariantType.secondary,
            block: ButtonBlockType.fill,
            events: {
              click () {
                ChatController.toggleModalAddUser(false);
              },
            },
          },
        ),
      }),
    });
  }

  createModalRemoveUser (value: boolean, selectedUser: number | null) {
    const users = this.props.usersSelectedChat;
    return new Modal({
      isOpen: value ? 'show' : 'hide',
      title: ' Удалить пользователя',
      body: new Form({
        fields: [...PageChats.createUsersList(users, selectedUser)],
        submitButton: new Button(
          {
            text: 'Удалить',
            block: ButtonBlockType.fill,
            type: ButtonValueType.submit,
            events: {
              async click (evn: Event) {
                evn.preventDefault();
                await ChatController.removeUserFromChat();
                ChatController.toggleModalRemoveUser(false);
              },
            },
          },
        ),
        secondaryButton: new Button(
          {
            text: 'Отменить',
            type: ButtonValueType.reset,
            variant: ButtonVariantType.secondary,
            block: ButtonBlockType.fill,
            events: {
              click () {
                ChatController.toggleModalRemoveUser(false);
                ChatController.selectUser(null);
              },
            },
          },
        ),
      }),
    });
  }

  static createUsersList (data: UsersSelectedChatType[], selectedUser: number | null) {
    return data.reduce((acc: UserItemType[], curr) => {
      acc.push(new UserItem({
        first_name: curr.first_name,
        second_name: curr.second_name,
        id: curr.id,
        role: curr.role,
        selected: selectedUser === curr.id
          ? 'list-users__item--selected'
          : '',

        events: {
          click () {
            ChatController.selectUser(curr.id);
          },
        },
      }, 'div'));
      return acc;
    }, [] as UserItemType[]);
  }

  static createNotification (notification: NotificationPropsType) {
    return new Notification({
      title: notification.title,
      message: notification.message,
      isOpen: notification.isOpen,
      type: notification.type,
    });
  }

  render () {
    return this.compile(tpl, {
      lastMessage: this.children.lastMessage,
      dropdownChatActions: this.children.dropdownChatActions,
      dropdownAttachments: this.children.dropdownAttachments,
      buttonToProfile: this.children.buttonToProfile,
      inputSearchMessages: this.children.inputSearchMessages,
      formMessage: this.children.formMessage,
      dialogs: this.children.dialogs,
      modalCreateChat: this.children.modalCreateChat,
      modalAddUser: this.children.modalAddUser,
      modalRemoveUser: this.children.modalRemoveUser,
      modalRemoveChat: this.children.modalRemoveChat,
      isSelectedChat: this.props.selectedChat !== null,
    });
  }
}

function mapUserToProps (state: State) {
  return {
    chats: state.chats,
    messages: state.messanges,
    notification: state.notification,
    selectedChat: state.selectedChat,
    usersSelectedChat: state.usersSelectedChat,
    selectedUser: state.selectedUser,
    isOpenModalCreateChat: state.isOpenModalCreateChat,

  };
}

export default withStore((state) => mapUserToProps(state))(PageChats);

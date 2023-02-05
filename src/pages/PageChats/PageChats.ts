import Block from '../../modules/block';
import tpl from './chats.hbs';
import './chats.less';
import { PageChatsPropsType } from './types';
import Input from '../../components/input/Input';
import { InputBlockType, InputSizeType } from '../../components/input/types';
import LastMessage from '../../modules/chats/components/lastMessage/LastMessage';
import Dropdown from '../../components/dropdown/Dropdown';
import Button from '../../components/button/Button';
import { ButtonValueType, ButtonVariantType } from '../../components/button/types';
import Form from '../../modules/form/Form';

export default class PageChats extends Block {
  public props: any;

  constructor(props: PageChatsPropsType) {
    super('div', props);
    this.children.lastMessage = new LastMessage({
      text: 'Друзья, у меня для вас особенный выпуск новостей!...',
      name: 'Maria Shamonova',
      date: '10:34',
      counter: 4,
    });
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

  render() {
    return this.compile(tpl, {
      lastMessage: this.children.lastMessage,
      dropdownChatActions: this.children.dropdownChatActions,
      dropdownAttachments: this.children.dropdownAttachments,
      buttonToProfile: this.children.buttonToProfile,
      inputSearchMessages: this.children.inputSearchMessages,
      formMessage: this.children.formMessage,
    });
  }
}
export type PageChatsType = PageChats;

import login from './src/pages/PageLogin'
import registration from './src/pages/PageRegistration'
import chats from './src/pages/PageChats'
import profile from './src/pages/PageProfile'
import notFound from './src/pages/PageNotFound'
import serverError from './src/pages/PageServerError'
import { getPageByPathname } from './src/utils/getPageByPathname'
import template from './index.hbs'
import input from './src/components/input'
import button from './src/components/button'
import profileProperty from './src/modules/profile/profileProperty'
import avatar from './src/modules/profile/avatar'
import lastMessage from './src/modules/chats/components/lastMessage'
import { registerHelpers } from './src/utils/registerHelpers'
import dropdown from './src/components/dropdown'

registerHelpers()

function LoginPage () {
  return template({
    page: login({
      title: 'Авторизация',  
      loginInput: input('login', 'text', 'Логин', 'Введите логин'), 
      passwordInput: input('password', 'password', 'Пароль', 'Введите пароль'),
      buttonAuth: button('auth-button', 'Вход', 'primary', '/'),
      linkToRegistration: button('link-to-reg-button', 'Зарегистрироваться', 'borderless', '/registration'),
    }), 
   
  })
}
function ChatsPage () {

  return template({page: chats({
    lastMessage: lastMessage(
      'last-mesage',
      'Друзья, у меня для вас особенный выпуск новостей!...', 
      'Maria Shamonova', 
      '10:34',
      4
      ),
      dropdowntChatActions: dropdown(
        'dropdown-chat-actions',
        'more.png',
        [{
          id: 'add-user',
          title: 'Добавить пользователя',
          icon: 'plus-circle.png'
        },{
          id: 'remove-user',
          title: 'Удалить пользователя',
          icon: 'close-circle.png'
        }],
        32,
        'bottom'
      ),
    dropdownAttachments: dropdown(
      'dropdown-attachments', 
      'paperclip.png',
      [{
        id: 'image',
        title: 'Фото и видео',
        icon: 'image.png'
      },
      {
        id: 'file',
        title: 'Файл',
        icon: 'file.png'
      },
      {
        id: 'location',
        title: 'Локация',
        icon: 'location.png'
      }]
    ),
    buttonToProfile: button('link-to-profile-button', 'Профиль', 'borderless', '/profile'),
    inputSearchMessages: input('search', 'text', '', 'Поиск', '', 's'),
    inputMessage: input('message', 'text', '', 'Сообщение'),
    buttonSendMessage: button('send-message-button', '→', 'secondary'),
  })})
}

function RegiatrationPage () {
  return template({page: registration({
    title: 'Регистрация',  
    firstNameInput: input('first-name', 'text', 'Имя', 'Введите имя'), 
    secondNameInput: input('second-name', 'text', 'Фамилия', 'Введите фамилию'), 
    loginInput: input('login', 'text', 'Логин', 'Введите логин', '', 'm', true, true), 
    emailInput: input('email', 'text', 'Email', 'Введите почту'), 
    passwordInput: input('password', 'password', 'Пароль', 'Введите пароль','', 'm', true, true),
    confirmPasswordInput: input('confirm-password', 'password', 'Пароль еще раз', 'Введите пароль еще раз', '', 'm', true, true),
    phoneInput: input('phone', 'text', 'Телефон', 'Введите номер телефона'),
    buttonRegistration: button('reqistration-button', 'Создать аккаунт', 'primary'),
    linkToAuth: button('link-to-auth-button', 'Уже есть аккаунт?', 'borderless', '/login'),
  })})
}

function ProfilePage() {
  console.log('profile')
  const properties = [
    {
      id: 'email',
      title: 'Почта',
      placeholder: 'Введите почту',
      value: 'shamonova@yandex.ru',
    },
    {
      id: 'login',
      title: 'Логин',
      placeholder: 'Введите логин',
      value: 'shamonova',
    },
    {
      id: 'first_name',
      title: 'Имя',
      placeholder: 'Введите имя',
      value: 'Мария',
    },
    {
      id: 'second_name',
      title: 'Фамилия',
      placeholder: 'Введите фамилию',
      value: 'Шамонова',
    },
    {
      id: 'display_name',
      title: 'Имя в чате',
      placeholder: 'Введите имя в чате',
      value: 'honey.shamon',
    },
    {
      id: 'phone',
      title: 'Телефон',
      placeholder: 'Введите телефон',
      value: '89217425588',
    },
  ]
  let mode = 'default'
  return template({page: profile({
    mode,
    avatar: avatar(),
    profileProperties: properties.reduce((acc, curr) => {
      acc += profileProperty(curr.id, curr.title, curr.value)
      return acc
    }, ''),
    editProfileProperties:properties.reduce((acc, curr) => {
      acc += input(curr.id, 'text', curr.title, curr.placeholder, curr.value)
      return acc
    }, ''),
    oldPassswordInput: input('oldPassword', 'password', 'Старый пароль', 'Введите старый пароль'),
    newPassswordInput: input('newPassword', 'password', 'Новый пароль', 'Введите новый пароль'),
    confirmNewPassswordInput: input('confirmNewPassword', 'password', 'Новый пароль еще раз', 'Введите новый пароль еще раз'),
    buttonEditPassword: button('edit-password-button', 'Изменить пароль', 'secondary'),
    buttonEditData: button('edit-data-button', 'Редактировать профиль', 'primary'),
    buttonExit: button('exit-button', 'Выйти', 'borderless'),
    buttonReturnToDefaultMode: button('return-to-default-button', 'Отменить', 'secondary'),
    buttonSaveData: button('save-data-button', 'Сохранить', 'primary'),
    buttonSavePassword: button('save-password-button', 'Сохранить', 'primary'),
  })})

}
function NotFoundPage () {
  return template({page: notFound()})
}

function ServerErrorPage () {
  return template({page: serverError()})
}

const routes = {
  '/': ChatsPage,
  '/login': LoginPage,
  '/registration': RegiatrationPage,
  '/profile': ProfilePage,
  '/404': NotFoundPage,
  '/500': ServerErrorPage
}

const result = getPageByPathname(window.location.pathname, routes)()
const rootElement = document.getElementById('root')
rootElement.innerHTML = result


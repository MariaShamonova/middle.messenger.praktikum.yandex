export default function getProperties(data) {
  return [
    {
      name: 'email',
      title: 'Почта',
      placeholder: 'Введите почту',
      value: data.email,
    },
    {
      name: 'login',
      title: 'Логин',
      placeholder: 'Введите логин',
      value: data.login,
    },
    {
      name: 'first_name',
      title: 'Имя',
      placeholder: 'Введите имя',
      value: data.first_name,
    },
    {
      name: 'second_name',
      title: 'Фамилия',
      placeholder: 'Введите фамилию',
      value: data.second_name,
    },
    {
      name: 'display_name',
      title: 'Имя в чате',
      placeholder: 'Введите имя в чате',
      value: data.display_name,
    },
    {
      name: 'phone',
      title: 'Телефон',
      placeholder: 'Введите телефон',
      value: data.phone,
    },
  ];
}

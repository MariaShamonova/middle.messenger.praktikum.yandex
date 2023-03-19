function _splitDate(date: Date) {
  const dayMonth = date.getDate();
  const dayWeek = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  return [dayWeek, dayMonth, month, year];
}

export default function formatDate(date: string): string {
  const nowDate = new Date();
  const messageDate = new Date(date);

  const [nowDayMonth, nowDayWeek, nowMonth, nowYear] = _splitDate(nowDate);

  const [mesDayMonth, mesDayWeek, mesMonth, mesYear] = _splitDate(messageDate);

  if (nowYear === mesYear && mesMonth === nowMonth && nowDayWeek === mesDayWeek) {
    return [messageDate.getHours(), messageDate.getMinutes()].join(':');
  }
  if (nowYear === mesYear && mesMonth === nowMonth && nowDayMonth - nowDayMonth < 7) {
    return nowDayWeek.toString();
  }
  return [mesDayMonth, (mesMonth + 1), mesYear].join('.');
}

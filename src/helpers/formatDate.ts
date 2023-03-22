export default function formatDate(dateISO: string): string {
  const date = dateISO.substring(0, 10);
  const time = dateISO.substring(11, 16);
  return dateISO ? `${date} ${time}` : '';
}

export default function isArray<T>(obj: T) {
  return obj === Object(obj) && Object.prototype.toString.call(obj) === '[object Array]';
}

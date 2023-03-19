export default function isObject<T>(obj: T) {
  return obj === Object(obj) && obj != null;
}

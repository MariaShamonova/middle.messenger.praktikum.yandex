export default function isFunction(obj: unknown): obj is object {
  return obj === Object(obj) && Object.prototype.toString.call(obj) === '[object Function]';
}

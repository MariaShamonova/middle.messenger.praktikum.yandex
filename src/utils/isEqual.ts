import isFunction from './types/isFunction';
import isPrimitive from './types/isPrimitive';
import isObject from './types/isObject';
import { Indexed } from '../types/ComponentType';

export default function isEqual(
  a: Indexed | number | string,
  b: Indexed | number | string,
): boolean {
  if (isPrimitive(a) || isPrimitive(b)) {
    return a === b;
  }
  if (Object.keys(a).length !== Object.keys(b).length || !(isObject(a) && isObject(b))) {
    return false;
  }

  const isNotEqual = Object.keys(a).some((key) => {
    if (typeof a !== 'number'
      && typeof b !== 'number'
      && typeof a !== 'string'
      && typeof b !== 'string') {
      const isBothObjects = isObject(a[key]) && isObject(b[key]);
      const isBothNaNValues = Number.isNaN(a[key]) && Number.isNaN(b[key]);
      const isBothPrimitiveType = isPrimitive(a[key]) && isPrimitive(b[key]);
      const isOnePrimitiveType = isPrimitive(a[key]) || isPrimitive(b[key]);
      const isBothFunctions = isFunction(a[key]) && isFunction(b[key]);

      if ((isBothPrimitiveType && !isBothNaNValues && a[key] !== b[key])
        || (isOnePrimitiveType && a[key] !== b[key])
      ) return true;

      // Если оба значения - объекты
      if (!Object.hasOwn(b, key)
        || (Object.hasOwn(b, key)
          && isBothObjects
          && !isBothFunctions
          && !isEqual(a[key] as Indexed, b[key] as Indexed))) {
        return true;
      }
      // Если оба значения - функции
      if (isBothFunctions && (a[key] as Indexed).toString() !== (b[key] as Indexed).toString()) {
        return true;
      }
      return false;
    }
    return false;
  });

  return !isNotEqual;
}

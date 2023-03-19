import isObject from './types/isObject';
import isPrimitive from './types/isPrimitive';
import isArray from './types/isArray';
import isFunction from './types/isFunction';

function cloneDeep<T extends object = object>(obj: T) {
  let newObject: Record<string, any> = {};

  if (isArray(obj)) {
    newObject = [];
    for (const index in obj) {
      newObject.push(cloneDeep(obj[index as keyof object]));
    }
  } else {
    if (isFunction(obj)) {
      newObject = (obj as Function).bind({});
    }
    if (obj instanceof Set) newObject = new Set(obj);

    if (obj instanceof Map) newObject = new Map(obj);

    if (obj instanceof Date) newObject = new Date(obj);

    if (obj instanceof RegExp) newObject = new RegExp(obj);

    if (isPrimitive(obj)) {
      newObject = obj;
    }
    if (isObject(obj)) {
      for (const key in obj) {
        newObject[key] = cloneDeep(obj[key as keyof object]);
      }
    }
  }

  return newObject;
}

export default cloneDeep;

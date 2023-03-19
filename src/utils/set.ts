import isObject from './types/isObject';
import { Indexed } from '../types/ComponentType';

function set(object: Indexed, path: string, value: unknown): Indexed | unknown {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }
  if (isObject(object)) {
    const nestedFields = path.split('.');

    for (let i = 0; i < nestedFields.length; i++) {
      const key = nestedFields[i];

      if (i === nestedFields.length - 1) {
        object[key] = value;
      } else if (!object.hasOwnProperty(key)) {
        object[key] = {};
        object = object[key] as Indexed;
      } else if (object.hasOwnProperty(key)) {
        object = object[key] as Indexed;
      }
    }
    return object;
  }
  return typeof object;
}

export default set;

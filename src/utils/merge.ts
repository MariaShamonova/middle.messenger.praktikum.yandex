import isObject from './types/isObject';
import { Indexed } from '../types/ComponentType';

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const mergedObj: Indexed = lhs;
  Object.entries(rhs).forEach(([key, value]) => {
    if (lhs.hasOwnProperty(key)) {
      if (isObject(lhs[key]) && isObject(value)) {
        mergedObj[key] = merge(lhs[key] as Indexed, value as Indexed);
      } else {
        mergedObj[key] = [lhs[key], value];
      }
    } else {
      mergedObj[key] = value;
    }
  });
  return mergedObj;
}

export default merge;

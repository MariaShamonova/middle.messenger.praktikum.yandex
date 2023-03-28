export default function isPrimitive<T>(value: T) {
  const primitiveTypes = [
    'string',
    'number',
    'bigint',
    'boolean',
    'undefined',
    'symbol',
  ];
  return primitiveTypes.includes(typeof value) || value === null;
}

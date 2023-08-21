
const isPlainObject = (obj: unknown): obj is Record<PropertyKey, unknown> => `${obj}` === '[object Object]';

export const camelCasefyObj = <T extends Record<string, any>>(obj: Record<string, any>) => {
  const recursiveMap = (item: unknown): unknown => {
    if (Array.isArray(item)) {
      return item.map(recursiveMap)
    }

    if (isPlainObject(item)) {
      return camelCasefyObj(item)
    }

    return item
  }

  return Object.keys(obj).reduce((acc, key): T => {
    const newKey = key.replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));

    if (Array.isArray(obj[key])) {
      return { ...acc, [newKey]: obj[key].map(recursiveMap) }
    }

    if (isPlainObject(obj[key])) {
      return { ...acc, [newKey]: camelCasefyObj(obj[key]) }
    }

    return { ...acc, [newKey]: obj[key] };
  }, {} as T);
}

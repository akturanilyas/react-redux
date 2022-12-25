import { BaseEnum } from '../types/models';

export function isEmpty<T>(value: Record<string, unknown> | number | string | undefined | null | T): boolean {
  const type = typeof value;

  if (value && type === 'object') {
    const properties = Object.keys(value);

    return properties.length === 0;
  }

  return !value;
}

export const isObject = (value: Record<string, unknown>) =>
  typeof value === 'object' && !Array.isArray(value) && !isEmpty(value);

export const getBaseEnumValue = (item: BaseEnum | null) => {
  if (isObject(item as unknown as Record<string, unknown>)) {
    return item && item.value;
  }

  return item;
};

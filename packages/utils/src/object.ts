/**
 * Object utility functions
 */

/**
 * Check if object is empty
 */
export function isEmpty(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Check if object is not empty
 */
export function isNotEmpty(obj: Record<string, unknown>): boolean {
  return !isEmpty(obj);
}

/**
 * Get value from object by key path
 */
export function get<T>(obj: Record<string, unknown>, path: string): T | undefined {
  const keys = path.split('.');
  let result: unknown = obj;
  for (const key of keys) {
    if (result === null || result === undefined) return undefined;
    result = (result as Record<string, unknown>)[key];
  }
  return result as T;
}

/**
 * Set value in object by key path
 */
export function set<T>(obj: Record<string, unknown>, path: string, value: T): void {
  const keys = path.split('.');
  let current: Record<string, unknown> = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }
  current[keys[keys.length - 1]] = value;
}

/**
 * Delete value from object by key path
 */
export function del(obj: Record<string, unknown>, path: string): boolean {
  const keys = path.split('.');
  let current: Record<string, unknown> = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== 'object') {
      return false;
    }
    current = current[key] as Record<string, unknown>;
  }
  return delete current[keys[keys.length - 1]];
}

/**
 * Pick keys from object
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Omit keys from object
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result as Omit<T, K>;
}

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (obj instanceof Array) return obj.map((item) => deepClone(item)) as T;
  if (obj instanceof Object) {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        (clonedObj as Record<string, unknown>)[key] = deepClone((obj as Record<string, unknown>)[key]);
      }
    }
    return clonedObj;
  }
  return obj;
}

/**
 * Deep merge objects
 */
export function deepMerge<T extends Record<string, unknown>>(...objects: T[]): T {
  const result = {} as T;
  for (const obj of objects) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const objValue = (obj as Record<string, unknown>)[key];
        const resultValue = (result as Record<string, unknown>)[key];
        if (
          objValue &&
          typeof objValue === 'object' &&
          !Array.isArray(objValue) &&
          resultValue &&
          typeof resultValue === 'object' &&
          !Array.isArray(resultValue)
        ) {
          (result as Record<string, unknown>)[key] = deepMerge(
            resultValue as Record<string, unknown>,
            objValue as Record<string, unknown>
          );
        } else {
          (result as Record<string, unknown>)[key] = objValue;
        }
      }
    }
  }
  return result;
}

/**
 * Check if two objects are equal
 */
export function isEqual<T>(obj1: T, obj2: T): boolean {
  if (obj1 === obj2) return true;
  if (obj1 === null || obj2 === null) return false;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;
  if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;

  const keys1 = Object.keys(obj1 as object);
  const keys2 = Object.keys(obj2 as object);
  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (
      !isEqual(
        (obj1 as Record<string, unknown>)[key],
        (obj2 as Record<string, unknown>)[key]
      )
    ) {
      return false;
    }
  }
  return true;
}

/**
 * Invert object keys and values
 */
export function invert<T extends Record<string, string | number | symbol>>(
  obj: T
): Record<string, keyof T> {
  const result: Record<string, keyof T> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[String(obj[key])] = key as keyof T;
    }
  }
  return result;
}

/**
 * Map object values
 */
export function mapValues<T, U>(
  obj: Record<string, T>,
  fn: (value: T, key: string) => U
): Record<string, U> {
  const result: Record<string, U> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = fn(obj[key], key);
    }
  }
  return result;
}

/**
 * Filter object entries
 */
export function filterEntries<T>(
  obj: Record<string, T>,
  fn: (value: T, key: string) => boolean
): Record<string, T> {
  const result: Record<string, T> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && fn(obj[key], key)) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Convert object to array of entries
 */
export function entries<T>(obj: Record<string, T>): [string, T][] {
  return Object.entries(obj);
}

/**
 * Convert object to array of values
 */
export function values<T>(obj: Record<string, T>): T[] {
  return Object.values(obj);
}

/**
 * Convert object to array of keys
 */
export function keys<T>(obj: Record<string, T>): string[] {
  return Object.keys(obj);
}

/**
 * Get object size (number of keys)
 */
export function size(obj: Record<string, unknown>): number {
  return Object.keys(obj).length;
}

/**
 * Check if object has key
 */
export function hasKey(obj: Record<string, unknown>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * Create object from key-value pairs
 */
export function fromEntries<T>(entries: [string, T][]): Record<string, T> {
  return Object.fromEntries(entries);
}

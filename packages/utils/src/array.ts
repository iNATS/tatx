/**
 * Array utility functions
 */

/**
 * Check if array is empty
 */
export function isEmpty<T>(arr: T[] | null | undefined): boolean {
  return !arr || arr.length === 0;
}

/**
 * Check if array is not empty
 */
export function isNotEmpty<T>(arr: T[] | null | undefined): boolean {
  return !isEmpty(arr);
}

/**
 * Get unique values from array
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Get unique values from array based on a key
 */
export function uniqueBy<T>(arr: T[], key: keyof T): T[] {
  const seen = new Set();
  return arr.filter((item) => {
    const value = item[key];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

/**
 * Chunk array into smaller arrays
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/**
 * Shuffle array using Fisher-Yates algorithm
 */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Get random item from array
 */
export function randomItem<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Get first n items from array
 */
export function take<T>(arr: T[], n: number): T[] {
  return arr.slice(0, n);
}

/**
 * Get last n items from array
 */
export function takeRight<T>(arr: T[], n: number): T[] {
  return arr.slice(-n);
}

/**
 * Remove first n items from array
 */
export function drop<T>(arr: T[], n: number): T[] {
  return arr.slice(n);
}

/**
 * Remove last n items from array
 */
export function dropRight<T>(arr: T[], n: number): T[] {
  return arr.slice(0, -n);
}

/**
 * Group array by key
 */
export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce(
    (result, item) => {
      const groupKey = String(item[key]);
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    },
    {} as Record<string, T[]>
  );
}

/**
 * Partition array based on predicate
 */
export function partition<T>(arr: T[], predicate: (item: T) => boolean): [T[], T[]] {
  const truthy: T[] = [];
  const falsy: T[] = [];
  for (const item of arr) {
    if (predicate(item)) {
      truthy.push(item);
    } else {
      falsy.push(item);
    }
  }
  return [truthy, falsy];
}

/**
 * Flatten nested array
 */
export function flatten<T>(arr: T[][]): T[] {
  return arr.flat();
}

/**
 * Deep flatten nested array
 */
export function flattenDeep<T>(arr: unknown[]): T[] {
  return arr.flat(Infinity) as T[];
}

/**
 * Zip multiple arrays together
 */
export function zip<T>(...arrays: T[][]): T[][] {
  const maxLength = Math.max(...arrays.map((arr) => arr.length));
  const result: T[][] = [];
  for (let i = 0; i < maxLength; i++) {
    result.push(arrays.map((arr) => arr[i]));
  }
  return result;
}

/**
 * Interleave multiple arrays
 */
export function interleave<T>(...arrays: T[][]): T[] {
  const result: T[] = [];
  const maxLength = Math.max(...arrays.map((arr) => arr.length));
  for (let i = 0; i < maxLength; i++) {
    for (const arr of arrays) {
      if (arr[i] !== undefined) {
        result.push(arr[i]);
      }
    }
  }
  return result;
}

/**
 * Sort array by key
 */
export function sortBy<T>(arr: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...arr].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

/**
 * Get sum of numeric array
 */
export function sum(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0);
}

/**
 * Get sum of array by key
 */
export function sumBy<T>(arr: T[], key: keyof T): number {
  return arr.reduce((acc, item) => acc + Number(item[key]), 0);
}

/**
 * Check if arrays are equal
 */
export function arraysEqual<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((item, index) => item === arr2[index]);
}

/**
 * Get difference between arrays
 */
export function difference<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter((item) => !set2.has(item));
}

/**
 * Get intersection of arrays
 */
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter((item) => set2.has(item));
}

/**
 * Get union of arrays
 */
export function union<T>(...arrays: T[][]): T[] {
  return unique(arrays.flat());
}

/**
 * Move item in array from one index to another
 */
export function move<T>(arr: T[], fromIndex: number, toIndex: number): T[] {
  const result = [...arr];
  const [item] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, item);
  return result;
}

/**
 * Remove duplicates from array
 */
export function removeDuplicates<T>(arr: T[]): T[] {
  return unique(arr);
}

/**
 * Get min value from array
 */
export function min(arr: number[]): number {
  return Math.min(...arr);
}

/**
 * Get max value from array
 */
export function max(arr: number[]): number {
  return Math.max(...arr);
}

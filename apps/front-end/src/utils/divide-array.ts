/* eslint-disable @typescript-eslint/no-explicit-any */
export function divideArray(array: any[], size: number) {
  if (array) {
    return array.reduce((acc, _, i) =>
      (i % size === 0 ? [...acc, array.slice(i, i + size)] : acc), []);
  }
}
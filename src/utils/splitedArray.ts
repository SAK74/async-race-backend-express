export const splitedArray: <T>(array: T[], size: number) => T[][] = (
  array,
  size
) =>
  Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, size + i * size)
  );

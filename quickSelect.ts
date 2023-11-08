import { strict as assert } from 'node:assert';

function quickSelect(arr: number[], k: number, start = 0, end = arr.length - 1) {
  if (end <= start) {
    return;
  }
  
  // Partition
  const pivot = arr[end];
  let marker = start;

  for (let j = start; j < end; j++) {
    if (arr[j] < pivot) {
      [arr[j], arr[marker]] = [arr[marker], arr[j]];
      marker++;
    }
  }

  [arr[marker], arr[end]] = [arr[end], arr[marker]];

  if (marker === k) {
    return arr.slice(0, k);
  } else if (marker > k) {
    quickSelect(arr, k, start, marker - 1);
  } else {
    quickSelect(arr, k, marker + 1, end);
  }

  return arr.slice(0, k);
}

assert.deepStrictEqual(quickSelect([7, 10, 4, 3, 20, 15], 3), [ 3, 4, 7 ]);
assert.deepStrictEqual(quickSelect([7, 10, 4, 3, 20, 15], 4), [ 7, 10, 4, 3 ]);
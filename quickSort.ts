import { strict as assert } from 'node:assert';

function quickSort(arr, start = 0, end = arr.length - 1) {
  if (end <= start) {
    return;
  }

  // Partition the array
  const pivot = arr[end];
  let marker = start;

  for (let j = start; j < end; j++) {
    // Move smaller elements than pivot to left of the marker
    if (arr[j] < pivot) {
      [arr[j], arr[marker]] = [arr[marker], arr[j]];
      marker++;
    }
  }

  // Swap pivot with element on the marked position
  [arr[end], arr[marker]] = [arr[marker], arr[end]];

  quickSort(arr, start, marker - 1);
  quickSort(arr, marker + 1, end);

  return arr;
}

assert.deepStrictEqual(quickSort([10, 80, 30, 90, 40]), [10, 30, 40, 80, 90]);
assert.deepStrictEqual(quickSort([10, 80, 30, 90, 40, 50, 70]), [10, 30, 40, 50, 70, 80, 90]);
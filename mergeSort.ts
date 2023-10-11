function sortArray(arr: number[], l: number, m: number, r: number) {
  const leftArr: number[] = [];
  const rightArr: number[] = [];

  for (let a = l; a <= m; a++) {
    leftArr.push(arr[a]);
  }

  for (let a = m + 1; a <= r; a++) {
    rightArr.push(arr[a]);
  }

  let j = 0;
  let k = 0;
  let n = l;

  while ((j < leftArr.length) && (k < rightArr.length)) {
    if (leftArr[j] <= rightArr[k]) {
      arr[n] = leftArr[j];
      j++;
    } else {
      arr[n] = rightArr[k];
      k++
    }
    n++;
  }

  while (j < leftArr.length) {
    arr[n] = leftArr[j];
    j++;
  }

  while (k < rightArr.length) {
    arr[n] = rightArr[k];
    k++;
  }
}

function mergeSort(arr: number[], l: number, r: number) {
  console.log({ arr, l, r });

  if (l >= r) {
    return;
  }

  const m = l + Math.trunc((r - l) / 2);

  mergeSort(arr, l, m);
  mergeSort(arr, m + 1, r);

  console.log('sort', l, m, r);

  sortArray(arr, l, m, r);
}

const arrToMerge = [80, 30, 40, 10, 60, 90, 70, 20];

console.log({ arrToMerge });

mergeSort(arrToMerge, 0, arrToMerge.length - 1);

console.log({ arrToMerge });
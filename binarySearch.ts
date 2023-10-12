function iterativeBinarySearch(key: number, arr: number[]) {
  let m;
  let l = 0;
  let r = arr.length - 1;

  while (l <= r) {
    m = l + Math.trunc((r - l) / 2);

    console.log(l, r, m);

    if (arr[m] === key) {
      return m;
    }

    if (key > arr[m]) {
      l = m + 1;

      console.log('going up', l, r, m);
    } else {
      r = m - 1;

      console.log('going down', l, r, m);
    }
  }

  return -1;
}

function recursiveBinarySearch(key: number, arr: number[], l: number, r: number) {
  const m = l + Math.trunc((r - l) / 2);

  console.log(l, r, m)

  if (key === arr[m]) {
    return m;
  } 

  if (key > arr[m]) {
    l = m + 1;
  } else {
    r = m - 1;
  }

  if (l > r) {
    return -1;
  }

  return recursiveBinarySearch(key, arr, l, r);
}

const array = [10, 20, 30, 40, 50, 70, 80, 90];

console.log(iterativeBinarySearch(20, array));
console.log(iterativeBinarySearch(30, array));
console.log(iterativeBinarySearch(80, array));
console.log(iterativeBinarySearch(25, array));

console.log(recursiveBinarySearch(30, array, 0, array.length - 1));
console.log(recursiveBinarySearch(80, array, 0, array.length - 1));
console.log(recursiveBinarySearch(70, array, 0, array.length - 1));
console.log(recursiveBinarySearch(25, array, 0, array.length - 1));
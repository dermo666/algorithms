class MaxHeap {
  heap: number[] = [];

  parent(i) {
    return Math.trunc((i - 1) / 2);
  }

  getLeftChild(i) {
    return 2*i+1;
  }

  getRightChild(i) {
    return 2*i+2;
  }

  getLastIndex() {
    return this.heap.length - 1
  }

  private swap(i, k) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[k];
    this.heap[k] = temp;

  }

  insertKey(key) {
    this.heap.push(key);

    let i = this.getLastIndex();

    while (i > 0 && this.heap[this.parent(i)] < this.heap[i]) {
      this.swap(this.parent(i), i);

      i = this.parent(i);
    }
  }

  getMax() {
    return this.heap[0];
  }

  heapify(i) {
    const l = this.getLeftChild(i);
    const r = this.getRightChild(i);

    let max = i;
    
    if (l <= this.getLastIndex() && this.heap[l] > this.heap[max]) {
      max = l;
    }
    if (r <= this.getLastIndex() && this.heap[r] > this.heap[max]) {
      max = r;
    }

    if (max !== i) {
      this.swap(max, i);

      this.heapify(max);
    }
  }

  removeMax() {
    if (this.heap.length > 1) {
      this.heap[0] = this.heap[this.getLastIndex()];
    }

    this.heap.pop();

    this.heapify(0);
  }
}

const maxHeap = new MaxHeap();

maxHeap.insertKey(10);
maxHeap.insertKey(20);
maxHeap.insertKey(30);
maxHeap.insertKey(40);
maxHeap.insertKey(50);
maxHeap.insertKey(60);
maxHeap.insertKey(70);
maxHeap.insertKey(80);

console.log(maxHeap)

maxHeap.removeMax();

console.log(maxHeap)
class LinkedListNode {
  public next

  constructor(public data: unknown) { }
}

class LinkedList {
  private head?: LinkedListNode;

  addToEnd(data) {
    const newNode = new LinkedListNode(data);

    const lastNode = this.findLastNode();

    if (lastNode) {
      lastNode.next = newNode;
    } else {
      this.head = newNode;
    }

    return newNode;
  }

  findLastNode() {
    let node: LinkedListNode | undefined = this.head;

    while (node?.next) {
      console.log(node.next);
      node = node.next;
    }

    return node;
  }

  addToBeginning(data) {
    const newNode = new LinkedListNode(data);
    newNode.next = this.head;

    this.head = newNode;

    return newNode;
  }

  addAfterNode(data, afterNode: LinkedListNode) {
    const newNode = new LinkedListNode(data);

    const nextNode = afterNode.next;
    afterNode.next = newNode;
    newNode.next = nextNode;

    return newNode;
  }

  deleteFromEnd() {
    let node: LinkedListNode | undefined = this.head;
    let secondLast: LinkedListNode | undefined;

    while (node?.next) {
      secondLast = node;
      node = node.next;
    }

    if (secondLast) {
      secondLast.next = undefined;
    } else {
      this.head = undefined
    }
  }

  traverse() {
    let node: LinkedListNode | undefined = this.head;

    console.log('traverse >>>>>');

    do {
      console.log(node?.data);
      node = node?.next;
    } while (node)
  }

  reverse() {
    let current: LinkedListNode | undefined = this.head;
    let previous: LinkedListNode | undefined;
    let next: LinkedListNode | undefined;

    if (!current) return;

    do {
      next = current.next
      current!.next = previous;

      previous = current;
      current = next;
    } while (current);

    this.head = previous;
  }
}

const linkedList = new LinkedList()

const one = linkedList.addToEnd('one');

console.log(linkedList);

linkedList.addToEnd('two');
linkedList.addToEnd('three');

console.log(linkedList);

linkedList.addToBeginning('four');
linkedList.traverse();

linkedList.addAfterNode('five', one);
linkedList.traverse();

linkedList.reverse();
linkedList.traverse();

linkedList.deleteFromEnd();
linkedList.traverse();
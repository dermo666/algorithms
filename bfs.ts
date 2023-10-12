/** Breadth First Search */

class Graph {
  private matrix: number[][] = [];

  constructor(
    private numOfNodes
  ) {
    for (let i = 1; i <= numOfNodes; i++) {
      this.matrix[i] = [];
    }
  }

  addEdge(x: number,y: number) {
    console.log('adding edge', x, y);
    this.matrix[x].push(y);
    this.matrix[y].push(x);

    console.log(this.matrix);
  }

  breadthFirstSearch(startNode: number) {
    const visitedNodes: number[] = [];
    const nodesQueue: number[] = [startNode];

    do {
      const node = nodesQueue.shift()!;
      visitedNodes.push(node);

      for (let i = 0; i < this.matrix[node].length; i++) {
        const adjNode = this.matrix[node][i];
        if (!visitedNodes.includes(adjNode) && !nodesQueue.includes(adjNode)) {
          nodesQueue.push(adjNode);
        }
      }
    } while (nodesQueue.length > 0);

    console.log(visitedNodes);
  }
}

console.log('start');

const graph = new Graph(5);

graph.addEdge(1, 2);
graph.addEdge(2, 3);
graph.addEdge(1, 3);
graph.addEdge(3, 5);
graph.addEdge(4, 5);

graph.breadthFirstSearch(1);

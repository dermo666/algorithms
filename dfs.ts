/** Depth First Search */

class GraphDFS {
  private matrix: number[][] = [];

  constructor(private numOfNodes) {
    for (let i = 1; i <= numOfNodes; i++ ) {
      this.matrix[i] = [];
    }
  }

  addEdge(x: number, y: number) {
    this.matrix[x].push(y);
    this.matrix[y].push(x);

    console.log(this.matrix);
  }

  depthFirstSearch(startNode: number) {
    const visitedNodes: number[] = [];
    const nodeStack: number[] = [startNode];

    do {
      const node = nodeStack.pop()!;
      visitedNodes.push(node);

      for (let i = 0; i < this.matrix[node].length; i++) {
        const adjNode = this.matrix[node][i];

        if (!visitedNodes.includes(adjNode) && !nodeStack.includes(adjNode)) {
          nodeStack.push(adjNode);
        }
      }
    } while (nodeStack.length > 0);

    console.log(visitedNodes);
  }
}

const graphDFS = new GraphDFS(6);

graphDFS.addEdge(1, 2);
graphDFS.addEdge(1, 3);
graphDFS.addEdge(2, 4);
graphDFS.addEdge(4, 5);
graphDFS.addEdge(3, 5);
graphDFS.addEdge(2, 6);

graphDFS.depthFirstSearch(1);


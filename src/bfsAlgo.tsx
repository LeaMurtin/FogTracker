/*
 Breadth-First Search (BFS) is a graph traversal algorithm used to explore a graph systematically, 
 visiting all the vertices and edges in a breadthward motion. 
 The key idea behind BFS is to visit all the neighbors of a vertex before moving on to the next 
 level of vertices. Here’s a simple explanation of what BFS does:

   1. Starting Point: BFS starts from a specified “source” vertex in a graph.

   2. Exploration: It explores all the neighbors of the source vertex before moving on 
       to the neighbors of those neighbors. This process continues level by level.

   3. Queue-based: BFS uses a queue to keep track of the vertices that need to be visited. 
      The algorithm starts by enqueuing the source vertex, and then it repeatedly dequeues a vertex, 
      visits its neighbors, and enqueues the unvisited neighbors.
   
   4. Visited Set: To avoid processing the same vertex multiple times, BFS maintains a set of visited vertices. 
      Once a vertex is dequeued and visited, it is not enqueued again.

   5. Level Order Traversal: BFS naturally produces a level order traversal of the graph. 
      That is, it visits all the vertices at the current level before moving on to the next level. 
*/

// // Code example:
// class GraphTraversal {
// 	bfs(graph: Graph, startVertex: number): void {
// 		// Create a set to keep track of visited vertices
// 		const visited: Set<number> = new Set();
// 		// Create a queue to perform breadth-first traversal
// 		const queue: number[] = [];
// 		// Enqueue the starting vertex and mark it as visited
// 		queue.push(startVertex);
// 		visited.add(startVertex);
// 		// Continue traversal until the queue is empty
// 		while (queue.length !== 0) {
//       // Dequeue a vertex and print it (or process it as needed)
//       const currentVertex = queue.shift()!;
//       console.log(currentVertex);
//       // Get the neighbors of the current vertex
//       const neighbors = graph.adjacencyList.get(currentVertex) || [];
//       // Iterate through neighbors
//       for (const neighbor of neighbors) {
//         // If the neighbor hasn't been visited, mark it as visited and enqueue it
//         if (!visited.has(neighbor)) {
//         visited.add(neighbor);
//         queue.push(neighbor);
//         }
//       }
//       }
// 	}
// }

/////////////////////////////////////////////////////////////////////////

import { NodeArea } from "./types";

// Implementation for a bidirectionnal BFS:
const bidirectionalBFS = (startNode: NodeArea, endNode: NodeArea) => {
  let path: NodeArea[] = [];
  let midNode: NodeArea | null = null;
  // Initialize the start and end nodes and their queues
  let queueStart = [startNode];
  let visitedStart = new Set<NodeArea>();
  visitedStart.add(startNode);

  let queueEnd = [endNode];
  let visitedEnd = new Set<NodeArea>();
  visitedEnd.add(endNode);

  // Loop until both queues are empty
  while (queueStart.length > 0 && queueEnd.length > 0) {
    // BFS search from start node
    let currentStart = queueStart.shift();
    if (currentStart) {
      for (let neighbor of Object.values(currentStart.connections)) {
        if (!visitedStart.has(neighbor)) {
          neighbor.prev = currentStart;
          queueStart.push(neighbor);
          visitedStart.add(neighbor);
        }
        // If the neighbor has been visited by the end BFS, return the path
        if (visitedEnd.has(neighbor)) {
          neighbor.prev = currentStart;
          midNode = neighbor;
          break;
        }
      }
    }
    if (midNode != null) {
      break;
    }
    // BFS search from end node
    let currentEnd = queueEnd.shift();
    if (currentEnd) {
      for (let neighbor of Object.values(currentEnd.connections)) {
        if (!visitedEnd.has(neighbor)) {
          neighbor.next = currentEnd;
          queueEnd.push(neighbor);
          visitedEnd.add(neighbor);
        }
        // If the neighbor has been visited by the start BFS, return the path
        if (visitedStart.has(neighbor)) {
          neighbor.next = currentEnd;
          midNode = neighbor;
          break;
        }
      }
    }
    if (midNode != null) {
      break;
    }
  }
  if (midNode === null) {
    return 'No path found';
  }
  // extracting the actual path
  path.push(midNode);
  let current = midNode;
  while (current.prev !== null) {
    path.unshift(current.prev);
    current = current.prev;
  }
  current = midNode;
  while (current.next !== null) {
    path.push(current.next);
    current = current.next;
  }
 return path;
};
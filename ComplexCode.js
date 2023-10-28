/*
Filename: ComplexCode.js

This code is a complex implementation of a graph data structure using adjacency list representation. It provides various methods for manipulating and traversing the graph.

*/

// Define the Graph class
class Graph {
  constructor() {
    this.vertices = [];
    this.edges = new Map();
  }

  // Add a vertex to the graph
  addVertex(vertex) {
    this.vertices.push(vertex);
    this.edges.set(vertex, []);
  }

  // Add an edge between two vertices
  addEdge(vertex1, vertex2) {
    this.edges.get(vertex1).push(vertex2);
    this.edges.get(vertex2).push(vertex1);
  }

  // Depth First Search (DFS) traversal
  dfs(startingVertex) {
    const visited = new Set();
    this.dfsHelper(startingVertex, visited);
  }

  dfsHelper(vertex, visited) {
    visited.add(vertex);
    console.log(vertex);

    const neighbors = this.edges.get(vertex);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        this.dfsHelper(neighbor, visited);
      }
    }
  }

  // Breadth First Search (BFS) traversal
  bfs(startingVertex) {
    const visited = new Set();
    const queue = [];

    visited.add(startingVertex);
    queue.push(startingVertex);

    while (queue.length > 0) {
      const vertex = queue.shift();
      console.log(vertex);

      const neighbors = this.edges.get(vertex);
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  }

  // Check if there is a path between two vertices
  hasPath(vertex1, vertex2) {
    const visited = new Set();
    return this.hasPathHelper(vertex1, vertex2, visited);
  }

  hasPathHelper(vertex1, vertex2, visited) {
    visited.add(vertex1);

    if (vertex1 === vertex2) {
      return true;
    }

    const neighbors = this.edges.get(vertex1);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (this.hasPathHelper(neighbor, vertex2, visited)) {
          return true;
        }
      }
    }

    return false;
  }

  // Get the connected components of the graph
  getConnectedComponents() {
    const visited = new Set();
    const components = [];

    for (const vertex of this.vertices) {
      if (!visited.has(vertex)) {
        const component = [];
        this.getConnectedComponentsHelper(vertex, visited, component);
        components.push(component);
      }
    }

    return components;
  }

  getConnectedComponentsHelper(vertex, visited, component) {
    visited.add(vertex);
    component.push(vertex);

    const neighbors = this.edges.get(vertex);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        this.getConnectedComponentsHelper(neighbor, visited, component);
      }
    }
  }
}

// Create a graph
const graph = new Graph();

// Add vertices
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addVertex(5);

// Add edges
graph.addEdge(1, 2);
graph.addEdge(2, 3);
graph.addEdge(3, 4);
graph.addEdge(4, 5);

// Perform DFS traversal
console.log("DFS Traversal:");
graph.dfs(1);

// Perform BFS traversal
console.log("BFS Traversal:");
graph.bfs(1);

// Check if there is a path between two vertices
console.log("Has Path from 1 to 5:", graph.hasPath(1, 5));

// Get the connected components of the graph
console.log("Connected Components:", graph.getConnectedComponents());
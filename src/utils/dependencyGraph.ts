export function hasCycle(
  start: string,
  graph: Record<string, Set<string>>,
  visited = new Set<string>(),
  stack = new Set<string>()
): boolean {
  if (stack.has(start)) return true;

  if (visited.has(start)) return false;

  visited.add(start);
  stack.add(start);

  for (const neighbor of graph[start] || []) {
    if (hasCycle(neighbor, graph, visited, stack)) {
      return true;
    }
  }

  stack.delete(start);

  return false;
}
/**
 * @param {Node} from
 * @param {Node} to
 */
const updateConnection = (from, to) => {
  const newRisk = from.pathRisk + (to.risk - from.risk > 1 ? 999 : 1);
  if (newRisk < to.pathRisk) {
    to.pathRisk = newRisk;
    to.prev = from;
  }
};

/** @returns {Node} */
const pickNextFromQueue = (nodeQueue) => {
  /** @type {Node | null} */
  let next = null;
  for (const node of nodeQueue) {
    if (next === null || node.pathRisk < next.pathRisk) {
      next = node;
    }
  }
  return next;
};

export const dijkstra = (
  gridNums,
  xStart = 0,
  yStart = 0,
  xEnd = grid[0].length,
  yEnd = grid.length
) => {
  /**
   * @typedef {object} Node
   * @property {number} risk
   * @property {number} pathRisk
   * @property {boolean} visited
   * @property {Node | null} up
   * @property {Node | null} down
   * @property {Node | null} left
   * @property {Node | null} right
   * @property {Node | null} prev
   */

  /** @type {Node[][]} */
  const grid = gridNums.map((row) =>
    row.map((risk) => ({
      risk,
      pathRisk: Infinity,
      visited: false,
      up: null,
      down: null,
      left: null,
      right: null,
      prev: null,
    }))
  );
  // Loop until we've tested everything
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const node = grid[row][col];
      if (col > 0) node.left = grid[row][col - 1];
      if (col < grid[row].length - 1) node.right = grid[row][col + 1];
      if (row > 0) node.up = grid[row - 1][col];
      if (row < grid.length - 1) node.down = grid[row + 1][col];
    }
  }

  // Setup Dijkstra's algorithm
  grid[yStart][xStart].pathRisk = 0;
  const exit = grid[yEnd][xEnd];

  /** @type {Set<Node>} */
  const nodeQueue = new Set();
  nodeQueue.add(grid[yStart][xStart]);

  while (nodeQueue.size > 0) {
    // Stop when the exit is visited
    if (exit.visited) {
      break;
    }

    // Get next node
    const current = pickNextFromQueue(nodeQueue);

    // Update all connections
    if (current.up && !current.up.visited) {
      updateConnection(current, current.up);
      nodeQueue.add(current.up);
    }
    if (current.down && !current.down.visited) {
      updateConnection(current, current.down);
      nodeQueue.add(current.down);
    }
    if (current.right && !current.right.visited) {
      updateConnection(current, current.right);
      nodeQueue.add(current.right);
    }
    if (current.left && !current.left.visited) {
      updateConnection(current, current.left);
      nodeQueue.add(current.left);
    }

    // Mark as visited
    current.visited = true;

    // Remove from visited AFTER complete
    nodeQueue.delete(current);
  }

  return exit.pathRisk;
};

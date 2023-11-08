/*

You are given an m x n integer array grid. There is a robot initially located at the top-left corner (i.e., grid[0][0]). 
The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

An obstacle and space are marked as 1 or 0 respectively in grid. A path that the robot takes cannot include any square that is an obstacle.

Return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The testcases are generated so that the answer will be less than or equal to 2 * 109.

 

Example 1:


Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
Output: 2
Explanation: There is one obstacle in the middle of the 3x3 grid above.
There are two ways to reach the bottom-right corner:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right
Example 2:


Input: obstacleGrid = [[0,1],[0,0]]
Output: 1
 

Constraints:

m == obstacleGrid.length
n == obstacleGrid[i].length
1 <= m, n <= 100
obstacleGrid[i][j] is 0 or 1.
 
 */
import { string as assert} from 'node:assert';

function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  if (obstacleGrid[0][0] === 1) {
    return 0;
  }

  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;

  let results: number[][] = Array(m);
  for (let i = 0; i < m; i++) {
    results[i] = Array(n).fill(0);
  }

  results[0][0] = 1;

  for (let i = 0; i < n; i++) {
    for (let x = i; x < m; x++) {
      if (i === 0 && x === 0) {
        continue;
      }

      if (obstacleGrid[x][i] === 0) {
        const upperCell = i - 1 < 0 ? 0 : results[x][i - 1];
        const leftCell = x - 1 < 0 ? 0 : results[x - 1][i];

        results[x][i] = upperCell + leftCell;
      } else if (obstacleGrid[x][i] === 1){ 
        continue;
      }
    }

    for (let y = i + 1; y < n; y++) {
      if (!obstacleGrid[i]) {
        break;
      }
      if (obstacleGrid[i][y] === 0) {
        const upperCell = y - 1 < 0 ? 0 : results[i][y - 1];
        const leftCell = i - 1 < 0 ? 0 : results[i - 1][y];

        results[i][y] = upperCell + leftCell;
      } else if (obstacleGrid[i][y] === 1){ 
        continue;
      }
    }
  }

  return results[m - 1][n - 1];
};

const obstacleGrid1 = [[0,0,0],[0,1,0],[0,0,0]];
assert.strictEqual(uniquePathsWithObstacles(obstacleGrid1), 2);

const obstacleGrid2 = [[0,1],[0,0]];
assert.strictEqual(uniquePathsWithObstacles(obstacleGrid2), 1);
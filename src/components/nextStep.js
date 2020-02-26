import { ROWS, COLOMS } from "../constants";

export const nextStep = boardStatus => {
  const clonedBoardStatus = JSON.parse(JSON.stringify(boardStatus));
  const amountTrueNeighbors = (r, c) => {
    const neighbors = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1]
    ];
    return neighbors.reduce((trueNeighbors, neighbor) => {
      const x = r + neighbor[0];
      const y = c + neighbor[1];
      const isNeighborOnBoard = x >= 0 && x < ROWS && y >= 0 && y < COLOMS;
      /* No need to count more than 4 alive neighbors due to rules */
      if (trueNeighbors < 4 && isNeighborOnBoard && boardStatus[x][y]) {
        return trueNeighbors + 1;
      } else {
        return trueNeighbors;
      }
    }, 0);
  };

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLOMS; c++) {
      const totalTrueNeighbors = amountTrueNeighbors(r, c);

      if (!boardStatus[r][c]) {
        if (totalTrueNeighbors === 3) clonedBoardStatus[r][c] = true;
      } else {
        if (totalTrueNeighbors < 2 || totalTrueNeighbors > 3)
          clonedBoardStatus[r][c] = false;
      }
    }
  }

  return clonedBoardStatus;
};

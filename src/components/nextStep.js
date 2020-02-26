import { ROWS, COLOMS, RELATIVE_NEGHBOUR } from "../constants";

export const nextStep = presentGeneration => {
  const futureGeneration = JSON.parse(JSON.stringify(presentGeneration));

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLOMS; c++) {
      const totalLiveNeighbors = countLiveNeighbours(presentGeneration, r, c);

      if (isDeadCell(presentGeneration, r, c)) {
        if (totalLiveNeighbors === 3) futureGeneration[r][c] = true;
      } else {
        if (totalLiveNeighbors < 2 || totalLiveNeighbors > 3)
          futureGeneration[r][c] = false;
      }
    }
  }
  return futureGeneration;
};
function countLiveNeighbours(presentGeneration, r, c) {
  return RELATIVE_NEGHBOUR.reduce((countOfLiveNeighbours, relativeNeghbour) => {
    const x = r + relativeNeghbour[0];
    const y = c + relativeNeghbour[1];
    const isNeighborOnBoard = isPointOnTheGrid(x, y);
    /* No need to count more than 4 alive neighbors due to rules */
    if (
      canIcreamentLiveNeighbours(countOfLiveNeighbours, isNeighborOnBoard, x, y)
    ) {
      return countOfLiveNeighbours + 1;
    } else {
      return countOfLiveNeighbours;
    }
  }, 0);

  function canIcreamentLiveNeighbours(
    countOfLiveNeighbours,
    isNeighborOnBoard,
    x,
    y
  ) {
    return (
      countOfLiveNeighbours < 4 &&
      isNeighborOnBoard &&
      isLiveCell(presentGeneration, x, y)
    );
  }
}

function isLiveCell(boardStatus, x, y) {
  return boardStatus[x][y];
}

function isDeadCell(boardStatus, r, c) {
  return !isLiveCell(boardStatus, r, c);
}

function isPointOnTheGrid(x, y) {
  return x >= 0 && x < ROWS && y >= 0 && y < COLOMS;
}

import {
  LIMIT_FOR_CROWDED,
  LIMIT_FOR_LONELINESS,
  ROWS,
  COLOMS,
  RELATIVE_NEGHBOUR,
  LIMIT_FOR_BORN
} from "../constants";

export function getDeepClone(presentGeneration) {
  return JSON.parse(JSON.stringify(presentGeneration));
}
export function isAliveCell(boardStatus, x, y) {
  return boardStatus[x][y];
}

export function isDeadCell(boardStatus, r, c) {
  return !isAliveCell(boardStatus, r, c);
}

export function isPointOnTheGrid(x, y) {
  return x >= 0 && x < ROWS && y >= 0 && y < COLOMS;
}

export function isCrowded(totalLiveNeighbors) {
  return totalLiveNeighbors >= LIMIT_FOR_CROWDED;
}

export function isLoneliness(totalLiveNeighbors) {
  return totalLiveNeighbors < LIMIT_FOR_LONELINESS;
}

export function countAliveNeighbours(presentGeneration, r, c) {
  return RELATIVE_NEGHBOUR.reduce(
    (countOfAliveNeighbours, relativeNeghbour) => {
      const x = r + relativeNeghbour[0];
      const y = c + relativeNeghbour[1];
      const isNeighborOnBoard = isPointOnTheGrid(x, y);
      if (
        canIcreamentAliveNeighbours(
          presentGeneration,
          countOfAliveNeighbours,
          isNeighborOnBoard,
          x,
          y
        )
      ) {
        return countOfAliveNeighbours + 1;
      } else {
        return countOfAliveNeighbours;
      }
    },
    0
  );
}

function canIcreamentAliveNeighbours(
  presentGeneration,
  countOfAliveNeighbours,
  isNeighborOnBoard,
  x,
  y
) {
  return (
    countOfAliveNeighbours < 4 &&
    isNeighborOnBoard &&
    isAliveCell(presentGeneration, x, y)
  );
}

export function canBornInTheNextGeneration(countOfLiveNeighbours) {
  return countOfLiveNeighbours === LIMIT_FOR_BORN;
}

export function canDieInTheNextGeneration(countOfLiveNeighbours) {
  return (
    isLoneliness(countOfLiveNeighbours) || isCrowded(countOfLiveNeighbours)
  );
}

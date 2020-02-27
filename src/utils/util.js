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
export function isLiveCell(boardStatus, x, y) {
  return boardStatus[x][y];
}

export function isDeadCell(boardStatus, r, c) {
  return !isLiveCell(boardStatus, r, c);
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

export function countLiveNeighbours(presentGeneration, r, c) {
  return RELATIVE_NEGHBOUR.reduce((countOfLiveNeighbours, relativeNeghbour) => {
    const x = r + relativeNeghbour[0];
    const y = c + relativeNeghbour[1];
    const isNeighborOnBoard = isPointOnTheGrid(x, y);
    if (
      canIcreamentLiveNeighbours(
        presentGeneration,
        countOfLiveNeighbours,
        isNeighborOnBoard,
        x,
        y
      )
    ) {
      return countOfLiveNeighbours + 1;
    } else {
      return countOfLiveNeighbours;
    }
  }, 0);
}

function canIcreamentLiveNeighbours(
  presentGeneration,
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

export function canBornInTheNextGeneration(countOfLiveNeighbours) {
  return countOfLiveNeighbours === LIMIT_FOR_BORN;
}

export function canDieInTheNextGeneration(countOfLiveNeighbours) {
  return (
    isLoneliness(countOfLiveNeighbours) || isCrowded(countOfLiveNeighbours)
  );
}

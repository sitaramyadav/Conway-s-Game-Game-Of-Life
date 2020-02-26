import {
  LIMIT_FOR_CROWDED,
  LIMIT_FOR_LONELINESS,
  ROWS,
  COLOMS
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

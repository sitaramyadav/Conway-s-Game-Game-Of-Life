import { ROWS, COLOMS, RELATIVE_NEGHBOUR, LIMIT_FOR_BORN } from "../constants";

import {
  isCrowded,
  isLoneliness,
  isLiveCell,
  isDeadCell,
  isPointOnTheGrid,
  getDeepClone
} from "../utils/util";

export const getFutuerGeneration = presentGeneration => {
  const futureGeneration = getDeepClone(presentGeneration);

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLOMS; c++) {
      const countOfLiveNeighbours = countLiveNeighbours(
        presentGeneration,
        r,
        c
      );

      if (isDeadCell(presentGeneration, r, c)) {
        if (canBornInTheNextGeneration(countOfLiveNeighbours))
          futureGeneration[r][c] = true; // true mean it can born
      } else {
        if (canDieInTheNextGeneration(countOfLiveNeighbours))
          futureGeneration[r][c] = false; // false means it can die
      }
    }
  }
  return futureGeneration;
};
function canBornInTheNextGeneration(countOfLiveNeighbours) {
  return countOfLiveNeighbours === LIMIT_FOR_BORN;
}

function canDieInTheNextGeneration(countOfLiveNeighbours) {
  return (
    isLoneliness(countOfLiveNeighbours) || isCrowded(countOfLiveNeighbours)
  );
}

function countLiveNeighbours(presentGeneration, r, c) {
  return RELATIVE_NEGHBOUR.reduce((countOfLiveNeighbours, relativeNeghbour) => {
    const x = r + relativeNeghbour[0];
    const y = c + relativeNeghbour[1];
    const isNeighborOnBoard = isPointOnTheGrid(x, y);
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
    /* No need to count more than 4 alive neighbors due to rules */

    return (
      countOfLiveNeighbours < 4 &&
      isNeighborOnBoard &&
      isLiveCell(presentGeneration, x, y)
    );
  }
}

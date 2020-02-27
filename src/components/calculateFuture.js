import { ROWS, COLOMS } from "../constants";

import {
  isDeadCell,
  getDeepClone,
  countLiveNeighbours,
  canBornInTheNextGeneration,
  canDieInTheNextGeneration
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

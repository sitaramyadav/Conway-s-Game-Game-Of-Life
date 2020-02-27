import { ROWS, COLOMS } from "../constants";
const isAlive = () => Math.random() > 0.9;
export const getFirstGeneration = () => {
  const grid = [];
  for (let r = 0; r < ROWS; r++) {
    grid[r] = [];
    for (let c = 0; c < COLOMS; c++) {
      grid[r][c] = isAlive();
    }
  }
  return grid;
};

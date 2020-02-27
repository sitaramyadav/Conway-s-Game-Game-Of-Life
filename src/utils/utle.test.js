import { isLiveCell, isDeadCell } from "./util";

describe("isLiveCell", () => {
  it("should check and return true if a cell is true", () => {
    const gridOnCell = [[false, true]];
    const isLive = isLiveCell(gridOnCell, 0, 1);
    expect(isLive).toEqual(true);
  });

  it("should check and return false if a cell is dead", () => {
    const gridOnCell = [[false, false]];
    const isLive = isDeadCell(gridOnCell, 0, 0);
    expect(isLive).toEqual(true);
  });
});

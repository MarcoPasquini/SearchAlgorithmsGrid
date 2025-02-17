import { Grid } from "./grid.model";

export function createGrid(rows: number, cols: number): Grid {
    return Array.from({ length: rows }, (_, x) =>
      Array.from({ length: cols }, (_, y) => ({
        x,
        y,
        isWall: false,
        isStart: false,
        isEnd: false,
        isVisited: false,
        isVisitedEnd: false,
        isBorder: false,
        isBorderEnd: false,
        isPath: false,
        distance: Infinity,
        previous: null,
      }))
    );
  }
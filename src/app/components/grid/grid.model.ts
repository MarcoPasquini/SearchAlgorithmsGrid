export interface Cell {
    x: number;
    y: number;
    isWall: boolean;
    isStart: boolean;
    isEnd: boolean;
    isVisited: boolean;
    isVisitedEnd: boolean;
    isBorder:boolean;
    isBorderEnd:boolean;
    isPath: boolean;
    distance: number;
    previous: Cell | null;
  }
  
  export type Grid = Cell[][];
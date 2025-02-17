import { MinPriorityQueue } from '@datastructures-js/priority-queue';
import { Cell } from '../grid.model';
import { Queue } from './queue';

export abstract class Algorithm {
  grid: Cell[][] = [];
  size = 0;

  setupStart(grid: Cell[][], start: Cell, size: number) {
    this.grid = grid;
    this.size = size;
    start.distance = 0;
    start.isVisited = true;
  }

  abstract startAlgorithm(
    frontiera: Cell[] | Queue<Cell> | MinPriorityQueue<Cell>
  ): Promise<boolean>;
  getNeighbors(cell: Cell): Cell[] {
    const neighbors: Cell[] = [];
    const directions = [
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
    ];

    for (const dir of directions) {
      const newX = cell.x + dir.x;
      const newY = cell.y + dir.y;

      if (newX >= 0 && newX < this.size && newY >= 0 && newY < this.size) {
        neighbors.push(this.grid[newX][newY]);
      }
    }
    return neighbors;
  }
  heuristic(cell: Cell, end: Cell) {
    return Math.abs(cell.x - end.x) + Math.abs(cell.y - end.y);
  }

  abstract getNext(
    frontiera: Cell[] | Queue<Cell> | MinPriorityQueue<Cell>
  ): Cell;
  abstract isEmpty(
    frontiera: Cell[] | Queue<Cell> | MinPriorityQueue<Cell>
  ): boolean;
  abstract addNext(
    frontiera: Cell[] | Queue<Cell> | MinPriorityQueue<Cell>,
    neighbor: Cell
  ): undefined;
}

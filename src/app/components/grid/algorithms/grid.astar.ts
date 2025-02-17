import { Cell } from '../grid.model';
import { BestFirstGreedy } from './grid.bestfirstgreedy';

export class AStar extends BestFirstGreedy {
  override heuristic(cell: Cell, end: Cell): number {
    return super.heuristic(cell, end) + cell.distance;
  }
}

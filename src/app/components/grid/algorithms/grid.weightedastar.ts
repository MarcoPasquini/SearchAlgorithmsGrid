import { Cell } from '../grid.model';
import { BestFirstGreedy } from './grid.bestfirstgreedy';

export class WeightedAStar extends BestFirstGreedy {
  override heuristic(cell: Cell, end: Cell): number {
    return 1.5 * super.heuristic(cell, end) + cell.distance;
  }
}

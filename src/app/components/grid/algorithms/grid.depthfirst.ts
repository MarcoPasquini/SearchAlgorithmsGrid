import { Cell } from '../grid.model';
import { SingleFrontier } from './grid.singlefrontier';

export class DepthFirst extends SingleFrontier {
  async execDepthFirst(
    grid: Cell[][],
    start: Cell,
    size: number
  ): Promise<boolean> {
    this.setupStart(grid, start, size);

    const frontiera: Cell[] = [start];

    return this.startAlgorithm(frontiera);
  }
  getNext(frontiera: Cell[]): Cell {
    return frontiera.pop()!;
  }
  addNext(frontiera: Cell[], neighbor: Cell): undefined {
    frontiera.push(neighbor);
  }
  isEmpty(frontiera: Cell[]): boolean {
    return !frontiera.length;
  }
}

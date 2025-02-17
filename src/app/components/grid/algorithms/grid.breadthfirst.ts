import { Cell } from '../grid.model';
import { SingleFrontier } from './grid.singlefrontier';
import { Queue } from './queue';

export class BreadthFirst extends SingleFrontier {
  async execBreadthFirst(
    grid: Cell[][],
    start: Cell,
    size: number
  ): Promise<boolean> {
    this.setupStart(grid, start, size);

    const frontiera: Queue<Cell> = new Queue();
    frontiera.enqueue(start);

    return this.startAlgorithm(frontiera);
  }
  getNext(frontiera: Queue<Cell>): Cell {
    return frontiera.dequeue()!;
  }
  addNext(frontiera: Queue<Cell>, neighbor: Cell): undefined {
    frontiera.enqueue(neighbor);
  }
  isEmpty(frontiera: Queue<Cell>): boolean {
    return frontiera.isEmpty();
  }
}

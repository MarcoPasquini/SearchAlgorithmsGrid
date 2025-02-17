import { Cell } from '../grid.model';
import { Algorithm } from './grid.algorithm';
import { rebuildAlg } from './grid.utils';
import { MinPriorityQueue } from '@datastructures-js/priority-queue';

export class BestFirstGreedy extends Algorithm {
  async execInformed(
    grid: Cell[][],
    start: Cell,
    end: Cell,
    size: number
  ): Promise<boolean> {
    this.setupStart(grid, start, size);
    const frontiera = new MinPriorityQueue<Cell>((cell: Cell) =>
      this.heuristic(cell, end)
    );
    frontiera.enqueue(start);
    return this.startAlgorithm(frontiera);
  }

  override startAlgorithm(frontiera: MinPriorityQueue<Cell>): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const step = () => {
        if (this.isEmpty(frontiera)) {
          resolve(false);
          return;
        }

        const current: Cell = this.getNext(frontiera);
        current.isBorder = false;

        if (current.isEnd) {
          rebuildAlg(current);
          resolve(true);
          return;
        }

        this.processCell(current, frontiera);

        setTimeout(step, 20);
      };
      step();
    });
  }
  processCell(current: Cell, frontiera: MinPriorityQueue<Cell>): undefined {
    for (const neighbor of this.getNeighbors(current)) {
      this.checkNeighbor(neighbor, current, frontiera);
    }
  }
  checkNeighbor(
    neighbor: Cell,
    current: Cell,
    frontiera: MinPriorityQueue<Cell>
  ): undefined {
    if (neighbor.isWall || neighbor.isVisited) return;

    const tentativeDistance = current.distance + 1;
    if (tentativeDistance < neighbor.distance) {
      neighbor.distance = tentativeDistance;
      neighbor.previous = current;
      neighbor.isVisited = true;
      neighbor.isBorder = true;
      frontiera.enqueue(neighbor);
    }
  }
  getNext(frontiera: MinPriorityQueue<Cell>): Cell {
    return frontiera.dequeue()!;
  }
  isEmpty(frontiera: MinPriorityQueue<Cell>): boolean {
    return frontiera.isEmpty();
  }
  addNext(frontiera: MinPriorityQueue<Cell>, neighbor: Cell): undefined {
    frontiera.enqueue(neighbor);
  }
}

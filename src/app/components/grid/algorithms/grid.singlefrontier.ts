import { Cell } from '../grid.model';
import { Algorithm } from './grid.algorithm';
import { rebuildAlg } from './grid.utils';
import { Queue } from './queue';

export abstract class SingleFrontier extends Algorithm {
  startAlgorithm(frontiera: Cell[] | Queue<Cell>): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const step = () => {
        if (this.isEmpty(frontiera)) {
          resolve(false);
          return;
        }

        const current: Cell = this.getNext(frontiera);
        current.isBorder = false;

        let best = this.processCell(current, frontiera);

        if (best) {
          rebuildAlg(best);
          resolve(true);
          return;
        }
        setTimeout(step, 7);
      };

      step();
    });
  }

  processCell(current: Cell, frontiera: Cell[] | Queue<Cell>): Cell | null {
    for (const neighbor of this.getNeighbors(current)) {
      const best = this.checkNeighbor(neighbor, current, frontiera);
      if (best) {
        return best;
      }
    }
    return null;
  }
  checkNeighbor(
    neighbor: Cell,
    previous: Cell,
    frontiera: Cell[] | Queue<Cell>
  ) {
    if (neighbor.isVisited || neighbor.isWall) return;
    neighbor.previous = previous;
    neighbor.distance = neighbor.previous.distance + 1;
    if (neighbor.isEnd) {
      return neighbor;
    }
    neighbor.isVisited = true;
    this.addNext(frontiera, neighbor);
    neighbor.isBorder = true;
    return;
  }
}

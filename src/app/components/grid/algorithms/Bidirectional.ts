import { MinPriorityQueue } from '@datastructures-js/priority-queue';
import { Cell } from '../grid.model';
import { Algorithm } from './grid.algorithm';
import { rebuildAlg } from './grid.utils';
import { Queue } from './queue';

export class Bidirectional extends Algorithm {
  override startAlgorithm(
    frontiera: Cell[] | Queue<Cell> | MinPriorityQueue<Cell>
  ): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async execBidirectional(
    grid: Cell[][],
    start: Cell,
    end: Cell,
    size: number
  ) {
    this.setupStart(grid, start, size);

    let frontieraStart: Queue<Cell> = new Queue();
    let frontieraEnd: Queue<Cell> = new Queue();
    frontieraStart.enqueue(start);
    frontieraEnd.enqueue(end);
    end.distance = 0;
    end.isVisitedEnd = true;

    return this.startBidirectionalAlgorithm(frontieraStart, frontieraEnd);
  }
  startBidirectionalAlgorithm(
    frontieraStart: Queue<Cell>,
    frontieraEnd: Queue<Cell>
  ): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const step = () => {
        if (this.isEmpty(frontieraStart) || this.isEmpty(frontieraEnd)) {
          resolve(false);
          return;
        }
        const isFromStart = this.isFromStart(frontieraStart, frontieraEnd);
        let foundPath: boolean = this.chooseAndProcessCell(
          frontieraStart,
          frontieraEnd,
          isFromStart
        );

        if (foundPath) {
          resolve(true);
          return;
        }
        setTimeout(step, 5);
        return;
      };

      step();
    });
  }
  chooseAndProcessCell(
    frontieraStart: Queue<Cell>,
    frontieraEnd: Queue<Cell>,
    isFromStart: boolean
  ): boolean {
    if (isFromStart) {
      return this.processCell(frontieraStart, isFromStart);
    } else {
      return this.processCell(frontieraEnd, isFromStart);
    }
  }
  isFromStart(frontieraStart: Queue<Cell>, frontieraEnd: Queue<Cell>): boolean {
    return frontieraStart.peek()!.distance <= frontieraEnd.peek()!.distance;
  }
  processCell(frontiera: Queue<Cell>, isFromStart: boolean): boolean {
    const current: Cell = this.getNext(frontiera);
    this.updateCellVisuals(current, isFromStart);
    const best = this.processNeighbors(current, frontiera);
    if (best) {
      rebuildAlg(best);
      return true;
    }
    return false;
  }
  updateCellVisuals(cell: any, isFromStart: boolean): void {
    isFromStart ? (cell.isBorder = false) : (cell.isBorderEnd = false);
  }
  processNeighbors(current: Cell, frontiera: Queue<Cell>): Cell | null {
    for (const neighbor of this.getNeighbors(current)) {
      const best = this.checkNeighbor(neighbor, current, frontiera);
      if (best) {
        return best;
      }
    }
    return null;
  }
  checkNeighbor(next: Cell, previous: Cell, frontiera: Queue<Cell>) {
    if (this.isToSkip(previous, next)) return;
    if (this.isFound(previous, next)) {
      rebuildAlg(previous);
      return next;
    }
    next.previous = previous;
    next.distance = next.previous.distance + 1;
    if (previous.isVisited) {
      if (next.isEnd) return next;
      next.isVisited = true;
      next.isBorder = true;
    } else {
      next.isVisitedEnd = true;
      next.isBorderEnd = true;
    }
    frontiera.enqueue(next);
    return;
  }
  isFound(previous: Cell, next: Cell): boolean {
    return (
      (previous.isVisited && next.isBorderEnd) ||
      (previous.isVisitedEnd && next.isBorder)
    );
  }
  isToSkip(previous: Cell, next: Cell): boolean {
    return (
      (previous.isVisited && next.isVisited) ||
      (previous.isVisitedEnd && next.isVisitedEnd) ||
      next.isWall
    );
  }
  getNext(frontiera: Queue<Cell>): Cell {
    return frontiera.dequeue()!;
  }
  isEmpty(frontiera: Queue<Cell>): boolean {
    return frontiera.isEmpty();
  }
  addNext(frontiera: Queue<Cell>, neighbor: Cell): undefined {
    frontiera.enqueue(neighbor);
  }
}

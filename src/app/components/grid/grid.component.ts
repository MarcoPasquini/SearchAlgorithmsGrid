import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { createGrid } from './grid.utils';
import { DepthFirst } from './algorithms/grid.depthfirst';
import { Bidirectional } from './algorithms/Bidirectional';
import { Cell } from './grid.model';
import { BestFirstGreedy } from './algorithms/grid.bestfirstgreedy';
import { AStar } from './algorithms/grid.astar';
import { WeightedAStar } from './algorithms/grid.weightedastar';
import { BreadthFirst } from './algorithms/grid.breadthfirst';

type AlgorithmFunction = () => Promise<boolean>;
type AlgorithmsMap = Record<string, AlgorithmFunction>;

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent {
  @Input() algorithm!: string;
  rows = 18;
  cols = this.rows;
  grid = createGrid(this.rows, this.cols);
  stage = 0;
  start: Cell | undefined;
  end: Cell | undefined;
  result: boolean = false;

  private breadthFirst = new BreadthFirst();
  private depthFirst = new DepthFirst();
  private bidirectional = new Bidirectional();
  private bestFirstGreedy = new BestFirstGreedy();
  private aStar = new AStar();
  private weightedAStar = new WeightedAStar();

  onCellClick(row: any, col: any) {
    switch (this.stage) {
      case 0:
        this.grid[row][col].isStart = true;
        this.start = this.grid[row][col];
        this.stage++;
        break;
      case 1:
        if (this.grid[row][col].isStart) break;
        this.grid[row][col].isEnd = true;
        this.end = this.grid[row][col];
        this.stage++;
        break;
      case 2:
        if (this.grid[row][col].isStart || this.grid[row][col].isEnd) break;
        this.makeWall(row, col);
        break;
    }
  }
  randomStart() {
    let row = Math.floor(Math.random() * this.rows);
    let col = Math.floor(Math.random() * this.rows);
    this.grid[row][col].isStart = true;
    this.start = this.grid[row][col];
    this.stage++;
  }
  randomEnd() {
    let row = Math.floor(Math.random() * this.rows);
    let col = Math.floor(Math.random() * this.rows);
    if (this.grid[row][col].isStart) this.randomEnd();
    else {
      this.grid[row][col].isEnd = true;
      this.end = this.grid[row][col];
      this.stage++;
    }
  }
  randomWalls(factor: number) {
    if (this.stage > 2) return;
    this.resetWalls();
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.rows; j++) {
        if (this.grid[i][j].isStart || this.grid[i][j].isEnd) continue;
        if (Math.random() > factor) {
          this.makeWall(i, j);
        }
      }
    }
  }
  resetWalls() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j].isWall = false;
      }
    }
  }
  resetCells() {
    if (this.stage == 3) return;
    this.start = undefined;
    this.end = undefined;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j].isWall = false;
        this.grid[i][j].isStart = false;
        this.grid[i][j].isEnd = false;
        this.grid[i][j].isPath = false;
        this.grid[i][j].isVisited = false;
        this.grid[i][j].isVisitedEnd = false;
        this.grid[i][j].isBorder = false;
        this.grid[i][j].isBorderEnd = false;
        this.grid[i][j].distance = Infinity;
        this.grid[i][j].previous = null;
      }
    }
    this.stage = 0;
  }
  makeWall(row: number, col: number) {
    this.grid[row][col].isWall = !this.grid[row][col].isWall;
  }

  startAlgorithm() {
    const algorithms: AlgorithmsMap = {
      breadthFirst: () =>
        this.breadthFirst.execBreadthFirst(this.grid, this.start!, this.rows),
      depthFirst: () =>
        this.depthFirst.execDepthFirst(this.grid, this.start!, this.rows),
      bidirectional: () =>
        this.bidirectional.execBidirectional(
          this.grid,
          this.start!,
          this.end!,
          this.rows
        ),
      bestFirstGreedy: () =>
        this.bestFirstGreedy.execInformed(
          this.grid,
          this.start!,
          this.end!,
          this.rows
        ),
      aStar: () =>
        this.aStar.execInformed(this.grid, this.start!, this.end!, this.rows),
      weightedAStar: () =>
        this.weightedAStar.execInformed(
          this.grid,
          this.start!,
          this.end!,
          this.rows
        ),
    };

    const algorithmFunction = algorithms[this.algorithm];

    this.stage++;
    algorithmFunction().then((result: boolean) => {
      this.stage++;
      this.result = result;
    });
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import { GridComponent } from "../grid/grid.component";

@Component({
  selector: 'app-algorithm-selector',
  standalone: true,
  imports: [MatButtonToggleModule, CommonModule, MatButtonModule, GridComponent],
  templateUrl: './algorithm-selector.component.html',
  styleUrl: './algorithm-selector.component.scss'
})
export class AlgorithmSelectorComponent {
  isInformed = false;
  selectedAlgorithm = "breadthFirst";
  selectAlgorithmType(e:any){
    if(e.value == 'uninformed')
      this.isInformed = false;
    else
      this.isInformed = true;
    this.selectFirstAlgorithm();
  }
  selectFirstAlgorithm(){
    if(this.isInformed)
      this.selectedAlgorithm = "bestFirstGreedy";
    else
      this.selectedAlgorithm = "breadthFirst";
  }
  selectAlgorithm(e:any){
    this.selectedAlgorithm = e.value;
  }
}

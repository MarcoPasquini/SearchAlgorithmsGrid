import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlgorithmSelectorComponent } from "./components/algorithm-selector/algorithm-selector.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AlgorithmSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'search-algorithm';
}

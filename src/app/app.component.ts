import { Component, ViewChild } from '@angular/core';
import { ResultsComponent } from './results/results.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  term: string;
  @ViewChild(ResultsComponent) private resultsComponent: ResultsComponent;

  onChange(term) {
    this.resultsComponent.getMovies(term);
  }
}
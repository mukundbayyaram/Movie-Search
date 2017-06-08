import { Component, OnInit } from '@angular/core';
import { FetchService } from '../fetch.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  providers: [FetchService]
})

export class ResultsComponent implements OnInit {

  moviesList: any[];
  width;
  clicked = false;
  detailsLoaded = false;
  spinner = false;
  selectedMovie = {'title': ''};
  movieDetails = {"imdb_id": '', 'Poster': ''};

  constructor(private fetchService: FetchService) { }

  ngOnInit() {}

  // this.fetchService.getMovies('capta').subscribe(res => this.moviesList = res.results, null,
  //     () => this.select(this.moviesList[0]));

  getMovies(title) {
    this.moviesList = [];
    this.fetchService.getMovies(title).subscribe(res => this.moviesList = res.results);
  }

  select(movie) {
    this.selectedMovie = movie;
    this.spinner = true;
    this.detailsLoaded = false;
    this.fetchService.getDetails(movie.id)
    .subscribe(res => this.movieDetails = res,
      null,
      () => this.fetchService.getimdb(this.movieDetails.imdb_id)
      .subscribe(res => this.movieDetails = res, 
        null, 
        () => { 
          this.spinner = false; 
          this.detailsLoaded = true;
        }));
    }

    getWidth() {
      return this.width = screen.width;
    }
}
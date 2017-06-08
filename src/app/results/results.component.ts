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
  movieDetails = {'director': '', 'credits': {'crew': []}};
  directors: any[];
  
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
    this.directors = ["sam"];
    this.fetchService.getDetails(movie.id)
    .subscribe(res => this.movieDetails = res,
      null,
      // () => this.fetchService.getimdb(this.movieDetails.imdb_id)
      // .subscribe(res => this.movieDetails = res, 
      //   null, 
      () => {
        

        this.movieDetails.credits.crew.forEach(function(entry) {
          if(entry.job === 'Director') {
            this.movieDetails.director += ", ";
            this.movieDetails.director += entry.name;
          }
        }.bind(this));
        
        this.spinner = false; 
        this.detailsLoaded = true;
      });
    }

    getWidth() {
      return this.width = screen.width;
    }
}
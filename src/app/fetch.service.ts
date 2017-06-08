import { Injectable, } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class FetchService {

  private apikey = "f88369e02ba04d42791afea16a6fc58a";
  private url = "https://api.themoviedb.org/3/search/movie?api_key=" + this.apikey + "&language=en-US&page=1&query=";
  //private imdbUrl = "https://omdbapi.com/?i=";
  private detailsUrl = "https://api.themoviedb.org/3/movie/";
  result;

  constructor(private _http: Http) { }

  getMovies(title) {
    return this._http.get(this.url + title).map(res => res.json());
  }

  getDetails(id) {
    return this._http.get(this.detailsUrl + id + '?api_key=' + this.apikey + '&append_to_response=credits')
    .map(res => res.json());
  }

  // getimdb(id) {
  //   if(id != null) return this._http.get(this.imdbUrl + id).map(res => res.json());
  // }

}
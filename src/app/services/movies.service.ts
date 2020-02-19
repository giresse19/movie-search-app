import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { LoggerService } from "./logger.service";

import { PagedMovies, MovieDetail, Movie } from "./models";

@Injectable({
  providedIn: "root"
})
export class MoviesService {
  constructor(private http: HttpClient, private logger: LoggerService) {}
  movies: Movie[] = [];

  searchTermChanged = new Subject<string>();
  headerClick = new Subject<string>();

  fetchSearched(searchTerm: string, page: number): Observable<PagedMovies> {
    return this.http.get<PagedMovies>(`${environment.omdbapi.apiUrl}`, {
      params: new HttpParams()
        .set("apikey", environment.omdbapi.apiKey)
        .set("s", this.handleSpecialCharsHtml(searchTerm.trim()))
        .set("page", page.toString())
    });
  }

  getMovieDetails(imdbID: string): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${environment.omdbapi.apiUrl}`, {
      params: new HttpParams()
        .set("apikey", environment.omdbapi.apiKey)
        .set("i", imdbID)
    });
  }

  poster(poster: string) {
    this.logger.log("poster operation called");
    if (poster === "N/A") {
      return "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg";
    } else {
      return poster;
    }
  }

  defaultOfflinePoster(movie: any) {
    return (movie.Poster =
      "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg");
  }

  // keeps new search results to local storage
  storeSearchResults(state: any, data: any) {
    window.localStorage.setItem(JSON.stringify(state), JSON.stringify(data));
  }

  hasSearchResults(state: any): boolean {
    if (window.localStorage.getItem(JSON.stringify(state))) {
      return true;
    }
    return false;
  }

  // Prevent XXS attacks and a nasty error thrown by OMDB B.E API.
  handleSpecialCharsHtml(unsafe: string) {
    this.logger.log("escape char operation called");
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

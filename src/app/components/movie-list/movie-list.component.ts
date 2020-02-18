import { Component, OnInit } from "@angular/core";
import { MoviesService } from "src/app/services/movies.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Movie, NotFound } from "../../services/models";

const searchTermParamName = "s";
const pageParamName = "page";

@Component({
  selector: "app-movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.css"]
})

export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  response: NotFound;
  page: number = 1;
  totalItem: number;
  searchTerm: string;

  constructor(
    private service: MoviesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.searchTermChanged.subscribe(newTerm =>
      this.onSearchTermChange(newTerm)
    ); 
    this.setStateFromParams();
  }

  setStateFromParams() {
    this.activatedRoute.queryParams.subscribe(params => {
      let page = params[pageParamName];
      let searchTerm = params[searchTermParamName];         
      if (searchTerm) {
        this.page = page ? page : 1;
        this.searchTerm = searchTerm;
        this.getMovies();
      }
    });
  }

  onSearchTermChange(newTerm: string) {
    this.searchTerm = newTerm;   
    this.getMovies();
  }

  onPaginationChange(newPage: number) {
    this.page = newPage;
    this.getMovies();
  }

  getMovies() {
    this.service.fetchSearched(this.searchTerm, this.page).subscribe(res => {
      this.response = res;
      this.movies = res.Search;
      this.totalItem = res.totalResults;
      this.updateQueryParamsInUrl();   

      // todo: call function to save state to local storage.
      // window.localStorage.setItem()
    });
  }

  private updateQueryParamsInUrl() {
    const queryParams: Params = {
      [searchTermParamName]: this.searchTerm,
      [pageParamName]: String(this.page)
    };

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: "merge" 
    });
  }

  posterImage(poster: string) {
    return this.service.poster(poster);
  }
}

import { Component, OnInit } from "@angular/core";
import { MoviesService } from "src/app/services/movies.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Movie, PagedMovies } from "../../services/models";

const searchTermParamName = "s";
const pageParamName = "page";

@Component({
  selector: "app-movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.css"]
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  response: PagedMovies;
  page: number = 1;
  totalItem: number;
  searchTerm: string;

  constructor(
    private service: MoviesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    
    this.service.searchTermChanged.subscribe(newTerm => {
      
      this.onSearchTermChange(newTerm);
    });
    this.setStateFromParams();
  }

  onHeaderClick() {
    this.response = null;
    return (this.movies = []);
  }

  onPaginationChange(newPage: number) {
    this.page = newPage;
    this.getMovies();
  }

  getMovies() {
    let state: any = {
      searchParams: this.searchTerm,
      pageNumber: this.page
    };

    if (this.service.hasSearchResults(state)) {
      let result = JSON.parse(
        window.localStorage.getItem(JSON.stringify(state))
      );
      this.response = result;
      this.movies = result.Search;
      this.totalItem = result.totalResults;
      this.updateQueryParamsInUrl();
      return;
    }

    this.service.fetchSearched(this.searchTerm, this.page).subscribe(res => {
      this.service.storeSearchResults(state, res);
      this.response = res;
      this.movies = res.Search;
      this.totalItem = res.totalResults;
      this.updateQueryParamsInUrl();
    });
  }

  posterImage(poster: string) {
    return this.service.poster(poster);
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

  private setStateFromParams() {
   
    this.activatedRoute.queryParams.subscribe(params => {
      let page = params[pageParamName];
      let searchTerm = params[searchTermParamName];

      if (searchTerm) {
        this.page = page ? page : 1;
        this.searchTerm = searchTerm;
        this.getMovies();
      }
       
    })
  }

  private onSearchTermChange(newTerm: string) {
    this.searchTerm = newTerm;    
    this.getMovies();
  }
}

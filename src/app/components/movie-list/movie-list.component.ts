import { Component, OnInit } from "@angular/core";
import { MoviesService } from "src/app/services/movies.service";
import { ActivatedRoute } from "@angular/router";
import { Movie, NotFound } from "../../services/models";

@Component({
  selector: "app-movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.css"]
})
export class MovieListComponent implements OnInit {
  movies: Movie[];
  response: NotFound;

  constructor(
    private service: MoviesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(qparams => {
      let q = qparams["q"];
      this.service.fetchSearched(q).subscribe(res => {
       this.response = res;
       debugger;
        this.movies = res.Search;
      });
    });
  }

  posterImage(poster: string) {
    return this.service.poster(poster);
  }
}

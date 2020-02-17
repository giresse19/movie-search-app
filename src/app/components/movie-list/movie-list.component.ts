import { Component, OnInit } from "@angular/core";
import { MoviesService } from "src/app/services/movies.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.css"]
})
export class MovieListComponent implements OnInit {
  movies: any[];
  response: any;
 
  constructor(
    private service: MoviesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(qparams => {
      let q = qparams["q"];
      this.service.fetchSearched(q).subscribe(res => { 
       this.response = res;    
        this.movies = this.response.Search;
      });
    });
  }

  posterImage(poster: string) {
    return this.service.poster(poster);
  }
}

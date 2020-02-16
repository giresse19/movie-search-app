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

  constructor(
    private service: MoviesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {    
    this.activatedRoute.queryParams.subscribe(qparams => {
      let q = qparams["q"];
      this.service
        .fetchSearched(q)
        .subscribe(resp => (this.movies = resp.Search));
    });
  }

  posterImage(poster:string) {
    if(poster === "N/A") {
      return 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg'
    }else{
      return poster
    }
  }
}

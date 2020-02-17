import { Component, OnInit } from "@angular/core";
import { MoviesService } from "src/app/services/movies.service";
import { ActivatedRoute } from "@angular/router";
import { MovieDetail, NotFound } from "../../services/models";

@Component({
  selector: "app-movie-details",
  templateUrl: "./movie-details.component.html",
  styleUrls: ["./movie-details.component.css"]
})
export class MovieDetailsComponent implements OnInit {
  movie: MovieDetail;

  constructor(
    private service: MoviesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let id = params["imdbID"];
      this.service.getMovieDetails(id).subscribe(res => (this.movie = res));
    });
  }

  posterImage(poster:string) {
    return this.service.poster(poster)
  }

  goBack(){
    window.history.back();
  }
}

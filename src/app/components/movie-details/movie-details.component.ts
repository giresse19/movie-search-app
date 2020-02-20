import { Component, OnInit } from "@angular/core";
import { MoviesService } from "src/app/services/movies.service";
import { ActivatedRoute } from "@angular/router";
import { MovieDetail } from "../../services/models";

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
    this.getMovieDetails();
  }

  posterImage(poster: string) {
    return this.service.poster(poster);
  }

  goBack() {
    window.history.back();
  }

  detectConnectionStatus() {
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    function updateOnlineStatus(event) {
       return navigator.onLine;    
    }
    
  }

  private getMovieDetails() {
    this.activatedRoute.params.subscribe(params => {
      let id = params["imdbID"];
      let state: any = {
        imdbParams: id
      };

      if (this.service.hasSearchResults(state)) {
        let result = JSON.parse(
          window.localStorage.getItem(JSON.stringify(state))
        );
        this.movie = result;
        return;
      }

      this.service.getMovieDetails(id).subscribe(res => {
        this.service.storeSearchResults(state, res);
        this.movie = res;
      });
    });
  }
}

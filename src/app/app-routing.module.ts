import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { MovieListComponent } from "./components/movie-list/movie-list.component";
import { MovieDetailsComponent } from "./components/movie-details/movie-details.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "movies"
  },
  {
    path: "home",
    component: HomepageComponent
  },
  {
    path: "movies",
    component: MovieListComponent
  },
  {
    path: "movie-details/:imdbID",
    component: MovieDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

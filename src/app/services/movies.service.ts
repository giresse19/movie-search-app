import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  constructor(private http: HttpClient) {}

  fetchSearched(searchTerm: string): Observable<any> {
    return this.http.get(`${environment.omdbapi.apiUrl}`, {
      params: new HttpParams()
        .set("apikey", environment.omdbapi.apiKey)
        .set("s", searchTerm)
      //  .set('page', page.toString())
    });
  }
}

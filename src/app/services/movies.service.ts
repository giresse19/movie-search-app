import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

const API_Key: string = '699cc594';
const BASE_URL: string = `http://www.omdbapi.com/?apikey=${API_Key}`;

@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  constructor(private http: HttpClient) {}

  fetchSearched(searchTerm: string): Observable<any> {
    return this.http.get(BASE_URL, {params: {s: searchTerm}});
  }
}

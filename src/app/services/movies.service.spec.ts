import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { MoviesService } from "./movies.service";
import { res, details } from "../mocked-api-response/db-data";
import { environment } from "src/environments/environment";

describe("MoviesService", () => {
  let service: MoviesService;
  let httpTestingController: HttpTestingController;  
  let imdbID: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MoviesService,        
      ]
    });

    service = TestBed.inject(MoviesService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should fetch searched movies", () => {
    service.fetchSearched("spider", 1).subscribe(res => {
      
      expect(res).toBeTruthy('No Movies returned');    
      expect(res.Search.length).toBe(10, "incorrect number of Movies");

      const movie = res.Search.find(movie => movie.Title);
      expect(movie.Title).toContain("Spider");
      imdbID = movie.imdbID;
    });

    const req = httpTestingController.expectOne(
      req => req.url == `${environment.omdbapi.apiUrl}`
    );

    expect(req.request.method).toEqual("GET");
    expect(req.request.params.get("apikey")).toEqual("699cc594");
    expect(req.request.params.get("s")).toEqual("spider");
    expect(req.request.params.get("page")).toEqual("1");

    req.flush({
      ...res
    });
  });

  it("should get a movie details", () => {

    service.getMovieDetails(imdbID)
    .subscribe(() => {
      expect(details).toBeTruthy('No Movie detail returned');    
      expect(details.Title).toContain("Spider");
      expect(details.Type).toContain("movie");
    })   

    const req = httpTestingController.expectOne(
      req => req.url == `${environment.omdbapi.apiUrl}`
    );

    expect(req.request.method).toEqual("GET");
    expect(req.request.params.get("apikey")).toEqual("699cc594");
    expect(req.request.params.get("i")).toEqual(imdbID);

    req.flush({
      ...details
    });
  
  });

  it("should escape unsafe character", () => {
    const result1 = service.handleSpecialCharsHtml("&");
    const result2 = service.handleSpecialCharsHtml("<");
    const result3 = service.handleSpecialCharsHtml(">");
    const result4 = service.handleSpecialCharsHtml('"');
    const result5 = service.handleSpecialCharsHtml("'");

    expect(result1).toBe("&amp;");
    expect(result2).toBe("&lt;");
    expect(result3).toBe("&gt;");
    expect(result4).toBe("&quot;");
    expect(result5).toBe("&#039;");
   
  });

  it("should return default poster", () => {
    const poster = service.poster("N/A");
    expect(poster).toBe(
      "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg"
    );    
  });
});

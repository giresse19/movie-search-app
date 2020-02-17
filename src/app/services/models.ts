export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }

  export interface PagedMovies {    
    Search: Movie[];
    totalResults: number;
    Response: boolean;
    Error: string;
  }

  export interface MovieDetail {
    Title: string;
    Rated: string;
    Year: string
    Director: string;
    Genre:string;
    Writer: string;
    Actors: string;
    Plot: string; 
    Released: string;
    Runtime: string;
    Country:string;
    Language: string;
    Awards: string;
    Ratings: Rating[];
    imdbRating: string; 
    imdbID: string;
    BoxOffice: string; 
    Type: string;
    Poster: string;
  }

  export interface Rating {
    Source: string;
    Value: string;
  }

  export interface NotFound {
    Response: boolean;
    Error: string;
  }

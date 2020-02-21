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
    Year: string;
    Type: string;
    Poster: string;
    Plot: string; 
    imdbRating: string; 
    Runtime: string;   
    Genre:string;  
    Country:string;
    Language: string;   
    imdbID: string;
  }

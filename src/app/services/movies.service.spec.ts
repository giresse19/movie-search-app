import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        MoviesService,       
    ]
    });
    service = TestBed.inject(MoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should escape unsafe character', () => {  
    const result1 = service.handleSpecialCharsHtml("&") ;
    const result2 = service.handleSpecialCharsHtml("<") ;
    const result3 = service.handleSpecialCharsHtml(">") ;
    const result4 = service.handleSpecialCharsHtml('"') ;
    const result5 = service.handleSpecialCharsHtml("'") ;    

    expect(result1).toBe("&amp;");
    expect(result2).toBe("&lt;"); 
    expect(result3).toBe("&gt;");
    expect(result4).toBe("&quot;");
    expect(result5).toBe("&#039;");  

  })
  
  it("should return default poster", () => {
    const poster = service.poster("N/A");
    expect(poster).toBe(
      "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg"
    );
  });

});



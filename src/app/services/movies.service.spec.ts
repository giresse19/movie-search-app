import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MoviesService } from "./movies.service";
import {LoggerService} from './logger.service';

describe("MoviesService", () => {
  let service: MoviesService;
  let loggerSpy: any;

  beforeEach(() => {
    console.log("Calling beforeEach");

    loggerSpy = jasmine.createSpyObj('LoggerService', ["log"]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MoviesService,
        {provide: LoggerService, useValue: loggerSpy}
      ]
    });
    service = TestBed.inject(MoviesService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should escape unsafe character", () => {
    console.log("unsafe character test");

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

    expect(loggerSpy.log).toHaveBeenCalledTimes(5);
  });

  it("should return default poster", () => {
    console.log("default poster test");

    const poster = service.poster("N/A");
    expect(poster).toBe(
      "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg"
    );    
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});

import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PaginationComponent } from "./pagination.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

describe("PaginationComponent", () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [PaginationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should change page", () => {
    //const result = component.changePage(page: number)
    pending();
  });

  it("should get previous page", () => {
    //const result = component.previous()
    pending();
  });

  it("should get next page", () => {
    //const result = component.next()
    pending();
  });
});

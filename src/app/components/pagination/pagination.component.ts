import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

import { ActivatedRoute } from "@angular/router";

const pageSize = 10;
const pageParamName = "page";

@Component({
  selector: "pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"]
})
export class PaginationComponent implements OnInit {
  @Input("total-items") totalItems: number;
  @Output("page-changed") pageChanged = new EventEmitter();

  currentPage: number;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.currentPage = params[pageParamName];
    });
  }

  onPageChanged() {
    this.pageChanged.emit(this.currentPage);
  }

  changePage(page) {
    this.currentPage = page;
    this.onPageChanged();
  }

  previous() {
    if (this.currentPage === 1) return;
    this.currentPage--;
    this.onPageChanged();
  }

  next() {
    if (this.currentPage === this.lastPage) return;
    this.currentPage++;
    this.onPageChanged();
  }
  get lastPage() {
    
    return Math.ceil(this.totalItems / pageSize);
  }
}

import {
  Component,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";

const pageSize = 10;

@Component({
  selector: "pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"]
})
export class PaginationComponent {
  @Input("total-items") totalItems: number;
  @Output("page-changed") pageChanged = new EventEmitter();

  constructor() {}
  currentPage: number = 1;
  show: boolean = false;

  private onPageChanged() {
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

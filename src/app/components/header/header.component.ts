import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MoviesService } from "src/app/services";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  queryTerm: string;
  constructor(private route: Router, private service: MoviesService) {}

  ngOnInit(): void {}

  onSubmitHandler(event: any) {
    event.preventDefault();
    this.service.searchTermChanged.next(this.queryTerm);
  }

}

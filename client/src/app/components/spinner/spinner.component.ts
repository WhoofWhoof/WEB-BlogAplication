import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-spinner",
  templateUrl: "./spinner.component.html",
  styleUrls: ["./spinner.component.scss"]
})

export class SpinnerComponent implements OnInit {
  @Input() message = "";
  @Input() size = "23px";
  @Input() borderWidth = "6px";
  @Input() center = false;
  @Input() color = "#009688";

  constructor() {}

  ngOnInit() {}
}

import { Component, ElementRef, ViewChild } from "@angular/core";

import { UserProvider } from "@providers/user/user.provider";
import { SnackBarDisplay } from "./helpers/snack-bar-display";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent  {

  isLogged = false;
  userData = undefined;

  currentWindowPosition: number;

  showPricesMenu = false;
  showUserMenu = false;
  showInfoMenu = false;
  showProfileMenu = false;

  countUnseen = 0;
  countAnnouncements = 0;

  @ViewChild("app") appWrapper: ElementRef;

  constructor(
    private user: UserProvider,
    private snackBar: MatSnackBar
  ) {

    user.isLoggedAsync().subscribe((isLogged: boolean) => {
      this.isLogged = isLogged;
      if (isLogged === true) {
        this.userData = this.user.getUserData();
      } else {
        this.userData = undefined;
      }
    });

    SnackBarDisplay.initializeInstance(this.snackBar);
  }

  logout() {
    this.user.logout();
  }
}

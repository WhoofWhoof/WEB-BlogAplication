import { Component } from "@angular/core";

@Component({
        selector: "app-admin-container-component",
        templateUrl: "./admin-container.component.html",
        styleUrls: ["./admin-container.component.scss"]
    })
  
export class AdminContainerComponent {

   routes = [
    {
        link: "/admin/users",
        name: "Users",
    }
   ]
}
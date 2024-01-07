import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { ApiProvider } from "app/providers/api";
import { AdminEditUserDialogComponent } from "../edit-user-dialog/admin-edit-user-dialog.component";
import { SnackBarDisplay } from "app/helpers/snack-bar-display";
import { ConfirmDialogComponent } from "@components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: "app-admin-users-component",
  templateUrl: "./admin-users.component.html",
  styleUrls: ["./admin-users.component.scss"],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style(
        {
          height: '0px', 
          minHeight: '0',
          padding: '0px'
        })),
      state('expanded', style({
        height: '*',
    })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class AdminUsersComponent {
  dataSource: any;
  columnsToDisplay = ["id", "email", "password", "postCount", "expand"];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, "expand"]
  expandedElement: any = null;
  constructor(
    private api: ApiProvider,
    private sanitizer: DomSanitizer,
    private iconRegistry: MatIconRegistry,
    private dialog: MatDialog
  ) {

    this.iconRegistry.addSvgIcon("arrow-right",
      this.sanitizer.bypassSecurityTrustResourceUrl(
        "assets/svg/arrow-right-short.svg"))

  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.api.auth().get("admin/users")
      .subscribe((res: any) => {
        this.dataSource = res.users;
      });
  }

  deleteUser(id: number) {
    const dialogRef =
      this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          title: "Delete user",
          message: "Are you sure you want to delete this user?",
          delayTime: 3000
          }
          });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        this.api.auth().delete(`admin/users/${id}`)
          .subscribe((res: any) => 
          {
            SnackBarDisplay.getInstance().success("User deleted successfully");
            this.fetchData();
          });
      } else {
        SnackBarDisplay.getInstance().success("Action canceled");
      }
    }
  )};

  editUser(id: number) {
    // open dialog
    const user = this.dataSource.find(x => x.id === id);
    const dialogRef =
    this.dialog.open(AdminEditUserDialogComponent, {
      width: '500px',
        data: {
          id: user.id,
          email: user.email,
          password: user.password,
          }
        });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
      if (res.success) {
        this.api.auth().post(`admin/users/${id}`, res.data)
          .subscribe((res: any) => {
            this.fetchData();
          });
      } else {
        SnackBarDisplay.getInstance().success("Action canceled");
      }
    }
    });
    // on dialog close, fetch data
  }

  toggleRow(element: { expanded: boolean; }) {
    element.expanded = !element.expanded;
  }
  isRowToggled(element: { expanded: boolean; }) {
    return element.expanded;
  }

}

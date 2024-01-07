import { NgModule } from "@angular/core";

import { routing } from "./admin.routing";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { SharedModule } from "../shared/shared.module";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AdminContainerComponent } from "@components/admin/admin-container.component";
import {MatTabsModule} from '@angular/material/tabs';
import { AdminUsersComponent } from "@components/admin/users/admin-users.component";
import { AdminEditUserDialogComponent } from "@components/admin/edit-user-dialog/admin-edit-user-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "@components/confirm-dialog/confirm-dialog.component";

@NgModule({
    providers: [],
    imports: [
      routing,
      CommonModule,
      MatIconModule,
      MatTableModule,
      SharedModule,
      MatButtonModule,
      MatCardModule,
      MatButtonModule,
      MatCardModule,
      MatIconModule,
      MatTableModule,
      MatMenuModule,
      MatFormFieldModule,
      ReactiveFormsModule,
      MatInputModule,
      FormsModule,
      MatTabsModule,
      MatDialogModule,
      MatCardModule,
    ],
    declarations: [
      ConfirmDialogComponent,
      AdminContainerComponent,
      AdminUsersComponent,
      AdminEditUserDialogComponent,
    ],
})
export class AdminModule {}
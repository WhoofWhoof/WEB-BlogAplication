import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminContainerComponent } from "@components/admin/admin-container.component";
import { AdminModule } from "./admin.module";
import { AdminUsersComponent } from "@components/admin/users/admin-users.component";

const routes: Routes = [
  {
    path: "", 
    component: AdminContainerComponent,
    children: [
      {
        path: "users",
        component: AdminUsersComponent,
      }
    ]
  }
];

export const routing: ModuleWithProviders<AdminModule> =
    RouterModule.forChild(routes);

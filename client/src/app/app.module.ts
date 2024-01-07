import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { ApiProvider } from "./providers/api";
import { TokenProvider } from "./providers/token-provider";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { UserProvider } from "./providers/user";
import { PermissionService } from "./auth/permission.service";
import { HeaderComponent } from "@components/header/header.component";
import { AuthGuardService } from "./auth/auth-guard.service";
import { AuthService } from "./auth/auth.service";
import { AdminGuardServiceCanActivate, AdminGuardServiceCanLoad } from "./auth/admin-guard.service";

@NgModule(
  {
    declarations: [
      HeaderComponent,
      AppComponent,
    ],
    imports: [
      BrowserModule, BrowserAnimationsModule,
      RouterModule.forRoot(
        [
          {
            path: "",
            loadChildren: () => import('./modules/home/home.module')
                                  .then(m => m.HomeModule)
          },
          {
            path: "sign-up",
            loadChildren: () => import('./modules/sign-up/sign-up.module')
                                  .then(m => m.SignUpModule)
          },
          {
            path: "login",
            loadChildren: () => import('./modules/login/login.module')
                                  .then(m => m.LoginModule)
          },
          {
            path: "new-post",
            loadChildren: () => import('./modules/new-post/new-post.module')
                                  .then(m => m.NewPostModule),
            canActivate: [AuthGuardService],
          },
          {
            path: "user/posts",
            loadChildren: () => import('./modules/user-posts/user-posts.module')
                                  .then(m => m.UserPostModule),
            canActivate: [AuthGuardService],
          },
          {
            path: "admin",
            loadChildren: () => import('./modules/admin/admin.module')
                                  .then(m => m.AdminModule),
            canActivate: [AdminGuardServiceCanActivate, AuthGuardService],
            canLoad: [AdminGuardServiceCanLoad],
          }
        ],
      ),
      HttpClientModule, MatMenuModule, MatIconModule,
      MatSidenavModule, MatButtonModule,
      MatDialogModule, MatSnackBarModule
    ],
    providers: [ApiProvider, TokenProvider, AuthService, UserProvider, PermissionService],
    exports: [],
    bootstrap: [AppComponent]
  })

  export class AppModule { }
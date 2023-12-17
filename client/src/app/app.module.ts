import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";


@NgModule(
  {
    declarations: [
      AppComponent
    ],
    imports: [
      BrowserModule,
      RouterModule.forRoot(
        [
          {
            path: '',
            loadChildren: () => import('./modules/login/login.module')
                                  .then(m => m.LoginModule)
          },
          {
            path: 'sign-up',
            loadChildren: () => import('./modules/sign-up/sign-up.module')
                                  .then(m => m.SignUpModule)
          },
          {
            path: 'login',
            loadChildren: () => import('./modules/login/login.module')
                                  .then(m => m.LoginModule)
          }
        ],
      ),
      BrowserAnimationsModule, HttpClientModule
    ],
    exports: [],
    bootstrap: [AppComponent]
  })

  export class AppModule { }
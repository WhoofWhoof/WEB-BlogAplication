import { NgModule } from "@angular/core";
import { LoginPageComponent } from "../../components/login/login-page.component";
import { routing } from "./login.routing";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";

@NgModule(
  {
    imports: [
      routing,
      CommonModule,
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
      MatCheckboxModule,
      MatIconModule,
      ReactiveFormsModule,
      MatCardModule
    ],
    declarations: [
      LoginPageComponent,
    ],
    exports: [
      LoginPageComponent,
    ],
    
  })

  export class LoginModule { }
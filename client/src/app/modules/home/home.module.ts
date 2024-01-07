import { NgModule } from "@angular/core";

import { HomeComponent } from "@components/home/home.component";
import { routing } from "./home.routing";
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
import { SpinnerModule } from "../spinner/spinner.module";
import { PostCardModule } from "../post-card/post-card.module";
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
      PostCardModule,
    ],
    declarations: [
      HomeComponent,
    ],
})
export class HomeModule {}
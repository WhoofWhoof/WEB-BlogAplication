import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { PostCardComponent } from "@components/post-card/post-card.component";
import { CommonModule } from "@angular/common";
import { MatDividerModule } from "@angular/material/divider";
@NgModule({
    providers: [],
    imports: [
      MatCardModule,
      MatIconModule,
      CommonModule,
      MatDividerModule
    ],
    declarations: [
      PostCardComponent,
    ],
    exports: [
      PostCardComponent,
    ]
})
export class PostCardModule {}
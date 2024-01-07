import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { UserPostComponent } from "@components/user-post/user-post.component"
import { SharedModule } from "../shared/shared.module"
import { routing } from "./user-posts.routing"
import { PostCardModule } from "../post-card/post-card.module"
import { MatButtonModule } from "@angular/material/button"

@NgModule({
  imports: [
    routing,
    CommonModule,
    SharedModule,
    PostCardModule,
    MatButtonModule
  ],
  declarations: [
    UserPostComponent,
  ],
  exports: [
    UserPostComponent
  ]
})
export class UserPostModule {

}

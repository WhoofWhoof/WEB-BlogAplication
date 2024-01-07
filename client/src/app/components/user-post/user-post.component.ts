import { Component } from "@angular/core";
import { ApiProvider } from "app/providers/api";
import { UserProvider } from "app/providers/user";
import { isNil } from "lodash";

@Component({
  selector: "app-user-post-component",
  templateUrl: "./user-post.component.html",
  styleUrls: ["./user-post.component.scss"]
})

export class UserPostComponent {
  posts: any = undefined;
  fetchingPosts = false;

  constructor(
    private api: ApiProvider,
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.fetchingPosts = true;

    this.api.auth().get("posts/user-posts")
      .subscribe((res: any) => {
        this.posts = res;
        this.fetchingPosts = false;
      })
  }

  checkIfPostsExist() {
    return !isNil(this.posts) && this.posts.length > 0;
  }

  deletePost(id: number) {
    this.api.auth().delete(`post/delete/${id}`)
      .subscribe((res: any) => {
        this.fetchData();
      })
  }
}
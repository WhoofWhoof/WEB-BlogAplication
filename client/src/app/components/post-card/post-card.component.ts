import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { map } from "rxjs/internal/operators/map";
import { SafeResourceUrl } from "@angular/platform-browser";
import { isNil, isUndefined } from "lodash";
import { Observable } from "rxjs";
import { SnackBarDisplay } from "app/helpers/snack-bar-display";
import { Router } from "@angular/router";
import { ApiProvider } from "app/providers/api";

@Component({
  selector: "app-post-card-component",
  templateUrl: "./post-card.component.html",
  styleUrls: ["./post-card.component.scss"]
})

export class PostCardComponent {
  liked = false;
  public url: SafeResourceUrl;
  @Input() post: {
    id: number;
    email: string;
    title: string;
    description: string;
    image?: any;
  }
  @Input() delete?: boolean = false;
  @Output() deletePostEvent = new EventEmitter<number>();

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer,
              private http: HttpClient,
              private api: ApiProvider,
              private router: Router
              ) {
  
    this.iconRegistry.addSvgIcon("profile",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/svg/profile.svg"))

      this.iconRegistry.addSvgIcon("like",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/svg/like.svg"))

      this.iconRegistry.addSvgIcon("comment",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/svg/comment.svg"))

      this.iconRegistry.addSvgIcon("share",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/svg/share.svg"))
  }

  like() {
    this.liked = !this.liked;
  }

  ngOnChanges(changes: SimpleChanges) {
    const post: SimpleChange = changes.post;
    if (!isNil(post.currentValue)) {
      const image = post.currentValue.image;
      if (!isUndefined(image)) {
        if (this.isUrlImage(image)) {

          this.getImage(image).subscribe(x => {
            this.url = x;
          })
        } else {
          this.url = image;
        }
      }
      if (post.currentValue.title === "") {
        post.currentValue.title = "*title*";
      }
      if (post.currentValue.description === "") {
        post.currentValue.description = "*description*";
      }
    }
  }

  public getImage(url: string): Observable<SafeResourceUrl> {
    return this.http
      .get("http://localhost:3000/uploads/" + url, { responseType: 'blob' })
      .pipe(
        map(x => {
          const urlToBlob = window.URL.createObjectURL(x) // get a URL for the blob
          return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob); // tell Anuglar to trust this value
        }),
      );
  }

  isUrlImage(url: string) {
   // return if img is local or remote
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  deletePost(postId: number) {
    this.api.auth().delete(`user/post/delete-post/${postId}`)
      .subscribe((res: any) => {
        if (res.success === true) {
          SnackBarDisplay.getInstance().success("Post deleted successfully");
          // reload page
          this.deletePostEvent.emit(postId);
        }
        else {
          SnackBarDisplay.getInstance().error(res.message);
        }
      });
  }

}
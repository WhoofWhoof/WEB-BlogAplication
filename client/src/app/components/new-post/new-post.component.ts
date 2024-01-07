import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SnackBarDisplay } from "app/helpers/snack-bar-display";
import { ApiProvider } from "app/providers/api";
import { UserProvider } from "app/providers/user";

@Component({
  selector: "app-new-post-component",
  templateUrl: "./new-post.component.html",
  styleUrls: ["./new-post.component.scss"]
})

export class NewPostComponent implements OnInit {
  disableButton: boolean = false;
  image: any;
  imgToDisplay: any;
  form = new FormGroup({
    title: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
  });
  inputDiv: HTMLElement;
  input: any;
  constructor(public user: UserProvider,
              private api: ApiProvider,
              private router: Router) {
  }

  ngOnInit() {
    this.inputDiv = document.querySelector('.form__image');
    this.input = document.querySelector('.form__image input');

    this.inputDiv.addEventListener("drop", (e) => {
      e.preventDefault()
      // access the user uploaded image/s
      const files = e.dataTransfer.files
      for (let i = 0; i < files.length; i++) {
        if (!files[i].type.match("image"))
        continue;
      }
      // display the uploaded images on the screen
      this.image = files[0];
      this.imgToDisplay = URL.createObjectURL(files[0]);
    })
    this.input.addEventListener("change", (e) => {
      const file = this.input.files[0];
      this.image = file;
      this.imgToDisplay = URL.createObjectURL(file);
      // this.displayImage(e);
    })

    this.inputDiv.addEventListener("dragover", (e) => {
      e.preventDefault()
    })
  }

  createPost() {
    const formData = new FormData();
    formData.append("title", this.form.value.title);
    formData.append("description", this.form.value.description);
    formData.append("file", this.image);

    this.disableButton = true;
    this.api.auth().post("user/post/upload", formData)
      .subscribe((res: any) => {
        this.disableButton = false;
        if (res.success === true) {
          this.form.reset();
          this.image = null;
          this.imgToDisplay = null;
          SnackBarDisplay.getInstance().success("Post created successfully");
          this.router.navigate(["/user/posts"]);
        }
        else {
          SnackBarDisplay.getInstance().error(res.message);
        }
      });
  }
}
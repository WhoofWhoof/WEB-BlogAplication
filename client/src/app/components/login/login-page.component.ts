import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SnackBarDisplay } from 'app/helpers/snack-bar-display';
import { ApiProvider } from 'app/providers/api';
import { UserProvider } from 'app/providers/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  disableButton: boolean = false;

  form = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private user: UserProvider,
    private router: Router,
    ) {
      this.iconRegistry.addSvgIcon("right-arrow",
                            this.sanitizer.bypassSecurityTrustResourceUrl(
                                "assets/svg/arrow-right-short.svg"))
  }
  
  ngOnInit() {

  }

  loggin() {
    this.disableButton = true;
    if (this.user.isLogged()) {
      return;
    }
    this.user.login(this.form.value)
      .subscribe((res: any) => {
        if (res.success === true) {
          this.router
            .navigateByUrl(
              "/",
            );
        } else {
          SnackBarDisplay.getInstance().error(res.message);
        }
        this.disableButton = false;
      });
      this.disableButton = false;
  }
}

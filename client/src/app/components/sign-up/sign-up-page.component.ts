import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SnackBarDisplay } from 'app/helpers/snack-bar-display';
import { ApiProvider } from 'app/providers/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {
  disableButton: boolean = false;

  form = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    confirmPassword: new FormControl("", Validators.required)
  });
  
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router: Router,
    private api: ApiProvider,
    ) {
      this.iconRegistry.addSvgIcon("right-arrow",
      sanitizer.bypassSecurityTrustResourceUrl(
          "assets/svg/arrow-right-short.svg"))
  }

  subscription: Subscription = new Subscription();
  
  ngOnInit() {
    this.subscription = this.form.controls.password.valueChanges.subscribe(
      password => {
        this.form.controls.confirmPassword.setValidators([
          Validators.required,
          Validators.pattern(password ? password : '')
        ]);
      }
    );
  }

  signUp() {
    this.disableButton = true;
    this.api.post("auth/sign-up", this.form.value)
      .subscribe((res: any) => {
        if (res.success === true) {
          SnackBarDisplay.getInstance().success(res.message);
          this.router.navigate(['/login']);
        } else {
          SnackBarDisplay.getInstance().error(res.message);
        }
        this.disableButton = false;
      });
  }
}

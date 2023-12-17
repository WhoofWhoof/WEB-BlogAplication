import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {
  disableButton: boolean = false;

  form = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    confirmPassword: new FormControl("", Validators.required)
  });
  
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router: Router,
    ) {
  
  }

  subscription: Subscription = new Subscription();
  
  ngOnInit() {
    this.subscription = this.form.controls.password.valueChanges.subscribe(
      password => {
        console.log(password)
        this.form.controls.confirmPassword.setValidators([
          Validators.required,
          Validators.pattern(password ? password : '')
        ]);
      }
    );
  }

  signUp() {
    this.disableButton = true;
    alert('Sign Up');
    this.router.navigate(['/login']);
  }
}

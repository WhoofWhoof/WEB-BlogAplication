import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  disableButton: boolean = false;

  form = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    ) {
     
  }
  
  ngOnInit() {

  }

  signIn() {
    this.disableButton = true;
    alert('Sign in');
  }
}

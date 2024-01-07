import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Router } from "@angular/router";
import { includes, isNil, isUndefined, uniqueId, trim } from "lodash";
import { BehaviorSubject, fromEvent, of, ReplaySubject } from "rxjs";
import { catchError, filter, first, map, share, tap } from "rxjs/operators";

import { ApiProvider } from "../api/api";
import { TokenProvider } from "../token-provider";
import { PermissionService } from "../../auth/permission.service";

@Injectable()
export class UserProvider {
  _user: any = null;
  _loginEmail = "";

  _userTypeSubject = new BehaviorSubject<number>(-1);
  _userLoggedSubject = new ReplaySubject<boolean>(-1);

  constructor(public api: ApiProvider,
              private token: TokenProvider,
              private router: Router,
              private permissionService: PermissionService,
              @Inject(PLATFORM_ID) private platformId: Object) {

    this.api.getLoggedSubject().subscribe(val => {
      if (val === false) {
        this.logout();
      }
    });

    this.checkLogin();

    this.sync();
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    const seq = this.api.post("auth/login", accountInfo).pipe(share());
    seq.pipe()
    .subscribe((res: any) => {
        // If the API returned a successful response, mark the user as logged in
        if (res.success === true) {
          this._loggedIn(res);
        } else {
          
        }
      }, err => {
        // console.error('ERROR', err);
      });

    return seq;

  }

  getType() {
    return this._userTypeSubject;
  }

  getName() {
    if (this.isLogged()) {
      return this._user.email;
    }
    return "";
  }

  getUserData() {
    return this._user;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout(dispatch = true, redirect = true) {
    if (!isNil(this._user) && redirect) {
      this.router.navigateByUrl("/");
    }
    this._user = null;
    this.token.clearToken();
    this._userTypeSubject.next(-1);
    this._userLoggedSubject.next(false);
    this.setStorageLoggedIn(0, dispatch);
    this.permissionService.clearPermissions();
  }

  notLogged(dispatch = true) {
    this._user = null;
    this.token.clearToken();
    this._userTypeSubject.next(-1);
    this._userLoggedSubject.next(false);
    this.setStorageLoggedIn(0, dispatch);
  }

  /*
   * Process a login/signup response to store user data
   */

  _loggedIn(resp, dispatch = true) {
    if (!isUndefined(resp.token)) {
      this.token.setToken(resp.token);
      this._user = resp.userData;
      this._userLoggedSubject.next(true);
      this._userTypeSubject.next(resp.userData.type);
      this.setStorageLoggedIn(1, dispatch);
      // this.permissionService.fetchPermissions();
    }
  }

  isLogged() {
    return !isNil(this._user);
  }

  isLoggedAsync() {
    return this._userLoggedSubject;
  }

  hasAccess(route: string) {
    return this.isLogged() && includes(this._user.rights, route);
  }

  checkLogin(dispatch = true) {
    const url = `user/is-logged/${uniqueId()}`;
    const seq = this.api.auth().noHandle().get(url).pipe(
      first(),
      catchError((err) => {
        this.notLogged(dispatch);
        return of(JSON.stringify({}));
      })
    );
    try {
      seq.subscribe((res: any) => {
        if (Object.keys(res).length) {
          this._loggedIn(res, dispatch);
        } else {
          this.notLogged(dispatch);
        }
      }, () => { this.notLogged(dispatch); }, () => {});
    } catch (e) {
      this.notLogged(dispatch);
    }
  }

  checkEmailNotTaken(email: string) {
    email = trim(email);
    return this.api.get(`auth/check-email-taken/${email}`).pipe(
      map((res: any) => res.count),
      tap({ next: (res) => {
        if (res) {
          this.setLoginEmail(email);
        } else {
          this.clearLoginEmail();
        }
      }})
    );
  }

  setStorageLoggedIn(logged, dispatch) {
    if (isPlatformBrowser(this.platformId) && dispatch) {
      localStorage.setItem("loggedIn", logged);
    }
  }

  sync() {
    if (isPlatformBrowser(this.platformId)) {
      fromEvent<StorageEvent>(window, "storage").pipe(
        filter(evt => evt.key === "loggedIn"),
        filter(evt => evt.newValue !== null),
      ).subscribe(val => {
        if (+val.newValue === 0) {
          this.logout(false);
        } else {
          this.checkLogin(false);
        }
      });
    }
  }

  // LOGIN EMAIL PRECOMPLETE METHODS
  setLoginEmail(email) {
    this._loginEmail = email;
  }

  clearLoginEmail() {
    this._loginEmail = "";
  }

  getLoginEmail() {
    return this._loginEmail.length ? this._loginEmail : undefined;
  }
}

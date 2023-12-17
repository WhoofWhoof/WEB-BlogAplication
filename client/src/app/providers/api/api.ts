import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isDevMode } from "@angular/core";
import { isNil } from "lodash";
import { from, Observable, Subject, throwError } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { isPlatformServer } from "@angular/common";
import { TokenProvider } from "../token-provider";

@Injectable()
export class ApiProvider {
  url = "";

  useAuth = false;
  useHandle = true;
  private loggedSubject = new Subject<boolean>();

  constructor(public http: HttpClient,
              private token: TokenProvider,
              @Inject(PLATFORM_ID) platformId) {

      if (isDevMode()) {
        this.url = "http://localhost:4000";
      }
  }

  get<T>(endpoint: string, params?: any, options?: any): Observable<T> {
    if (!options) {
      const headers = new HttpHeaders();
      options = {headers: headers};
    }

    if (isNil(options.headers)) {
      options.headers = new HttpHeaders();
    }

    options.params = params;
    let observable;
    if (this.useAuth) {
      // console.log("TOKEN", this.token.getToken());
      observable = from(this.token.getToken()).pipe(
      map(token => {
        options.headers = options.headers.append("Authorization",
                                                 `JWT ${token}`);
        return options;
      }),
      switchMap(editedOptions => {
        return this.http.get(this.url + "/" + endpoint, editedOptions);
      }));
      this.useAuth = false;
    } else {
      observable = this.http.get(this.url + "/" + endpoint, options);
    }

    return this.handleErrors(observable);
  }

  post<T>(endpoint: string, body: any, options?: any): Observable<T> {
    let observable;
    if (!options) {
      const headers = new HttpHeaders();
      options = {headers: headers};
    }

    if (isNil(options.headers)) {
      options.headers = new HttpHeaders();
      options.headers = options.headers.append("Content-Type",
                                               "application/json");
    }

    if (this.useAuth) {
      observable = from(this.token.getToken()).pipe(
      map(token => {
        options.headers = options.headers.append("Authorization",
                                                 `JWT ${token}`);
        return options;
      }),
      switchMap(editedOptions =>
        this.http.post(this.url + "/" + endpoint, body, editedOptions)
      ));

      this.useAuth = false;
    } else {
      observable = this.http.post(this.url + "/" + endpoint, body, options);
    }

    return this.handleErrors(observable);
  }

  put<T>(endpoint: string, body: any, options?: any): Observable<T> {
    let observable;
    if (!options) {
      const headers = new HttpHeaders();
      options = {headers: headers};
    }

    if (isNil(options.headers)) {
      options.headers = new HttpHeaders();
      options.headers = options.headers.append("Content-Type",
                                               "application/json");
    }

    if (this.useAuth) {
      observable = from(this.token.getToken()).pipe(
      map(token => {
        options.headers = options.headers.append("Authorization",
                                                 `JWT ${token}`);
        return options;
      }),
      switchMap(editedOptions =>
                this.http.put(this.url + "/" + endpoint, body, editedOptions)));

      this.useAuth = false;
    } else {
      observable = this.http.put(this.url + "/" + endpoint, body, options);
    }

    return this.handleErrors(observable);
  }

  delete<T>(endpoint: string, options?: any): Observable<T> {
    let observable;
    if (!options) {
      const headers = new HttpHeaders();
      options = {headers: headers};
    }

    if (isNil(options.headers)) {
      options.headers = new HttpHeaders();
    }

    if (this.useAuth) {
      observable = from(this.token.getToken()).pipe(
      map(token => {
        options.headers = options.headers.append("Authorization",
                                                 `JWT ${token}`);
        return options;
      }),
      switchMap(editedOptions =>
        this.http.delete(this.url + "/" + endpoint, editedOptions)));

      this.useAuth = false;
    } else {
      observable = this.http.delete(this.url + "/" + endpoint, options);
    }

    return this.handleErrors(observable);
  }

  patch(endpoint: string, body: any, options?: any) {
    let observable;

    if (!options) {
      const headers = new HttpHeaders();
      options = {headers: headers};
    }

    if (isNil(options.headers)) {
      options.headers = new HttpHeaders();
      options.headers =
          options.headers.append("Content-Type", "application/json");
    }

    if (this.useAuth) {
      observable = from(this.token.getToken()).pipe(
      map(token => {
        options.headers = options.headers.append("Authorization",
                                                 `JWT ${token}`);
        return options;
      }),
      switchMap(editedOptions =>
        this.http.patch(this.url + "/" + endpoint, body, editedOptions)));

      this.useAuth = false;
    } else {
      observable = this.http.patch(this.url + "/" + endpoint, body, options);
    }

    return this.handleErrors(observable);
  }

  private handleErrors(observable: Observable<any>) {
    if (this.useHandle) {
      observable = observable.pipe(catchError((error) => {
        if (error.status === 401) {
          this.loggedSubject.next(false);
        }
        return throwError(error);
      }));
    }
    this.useHandle = true;

    return observable;
  }

  auth() {
    this.useAuth = true;
    return this;
  }

  noHandle() {
    this.useHandle = false;
    return this;
  }

  getLoggedSubject() {
    return this.loggedSubject;
  }

}

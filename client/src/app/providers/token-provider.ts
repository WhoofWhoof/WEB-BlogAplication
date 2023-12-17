import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isNil } from "lodash";
import { isPlatformBrowser } from "@angular/common";

@Injectable()
export class TokenProvider {

  _token: string;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  setToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      this._token = token;
      localStorage.setItem("token", token);
    }
  }

  getToken() {
    return new Promise((resolve, reject) => {
      if (!isNil(this._token)) {
        return resolve(this._token);
      }
      if (isPlatformBrowser(this.platformId)) {
        this._token = localStorage.getItem("token");
      }
      return resolve(this._token || "");
    });
  }

  clearToken() {
    this._token = undefined;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("token");
    }
  }

}

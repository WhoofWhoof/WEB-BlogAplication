

import { Injectable, inject } from "@angular/core";
import { UserProvider } from "app/providers/user";
import { Observable } from "rxjs/internal/Observable";
import { ReplaySubject } from "rxjs/internal/ReplaySubject";

@Injectable({ providedIn: "root" })

export class AuthService {
  constructor(
    private user: UserProvider,
  ) {}

    public isAuthenticated(): Observable<boolean> {
      return this.user.isLoggedAsync();
    }

    public isAdmin() {
      const subject = new ReplaySubject<boolean>(1);
      this.user.getType().pipe().subscribe(val => {
        if (val !== -1) {
          subject.next(val === 2);
        } else {
          subject.next(false);
        }
      });
      return subject;
    }
}

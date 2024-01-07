// src/app/auth/admin-guard.service.ts

import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { first, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({ providedIn: 'root'})
class AdminGuard {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate() {
    return this.auth.isAdmin().pipe(
      tap(value => {
        if (value === false) {
          this.router.navigateByUrl("/");
        }
      },
      first()
      )
    );
  }

  canLoad() {
    return this.auth.isAdmin().pipe(
      tap(value => {
        if (value === false) {
          this.router.navigateByUrl("/");
        }
      },
      first()
      )
    );
  }
}

export const AdminGuardServiceCanActivate: CanActivateFn =
  (): Observable<boolean> => {
    return inject(AdminGuard).canActivate();
  }

export const AdminGuardServiceCanLoad: CanActivateFn =
  (): Observable<boolean> => {
    return inject(AdminGuard).canLoad();
  }

  
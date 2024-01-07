import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { UserProvider } from "app/providers/user";
import { PermissionService } from "./permission.service";
import { Observable } from "rxjs/internal/Observable";
import { first } from "rxjs/internal/operators/first";
import { tap } from "rxjs/internal/operators/tap";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })

class AuthGuard {
  constructor(
    private router: Router,
    private user: UserProvider,
    private permissionService: PermissionService,
    private auth:AuthService
  ) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.auth.isAuthenticated().pipe(
      tap(value => {
        if (value === false) {
          this.router.navigate(["/login"]);
        }
      },
      first()
      )
    )
  }

}


export const AuthGuardService: CanActivateFn = 
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AuthGuard).canActivate(route, state);
  }
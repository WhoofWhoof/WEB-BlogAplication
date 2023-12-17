import { Injectable } from "@angular/core";
import { ApiProvider } from "../providers/api";
import { Router } from "@angular/router";
import { isNil } from "lodash";

@Injectable()
export class PermissionService {

    private userPermissions: string[] = [];

    constructor(private api: ApiProvider,
                private router: Router) {}

    async hasAccess(permission: string[]): Promise<boolean> {
      if (!this.userPermissions.length) {
        await this.fetchPermissions();
      }
      // console.log("This user has: ", this.userPermissions);
      // console.log("This route requires: ", permission);
      for (const p of permission) {
        if (!this.userPermissions.includes(p)) {
          return false;
        }
      }
      return true;
    }

    clearPermissions(): void {
      this.userPermissions = [];
    }

    async redirectToRouteThatHasAccess(routes: any[]): Promise<void> {
      const currentUrl = this.router.url;

      for (const route of routes) {
        if (await this.hasAccess(route.rights) || isNil(route.rights)) {
          const routeLink = route.link.split("./")[1];
          const navTo = currentUrl + "/" + routeLink;
          this.router.navigateByUrl(navTo);
          return;
        }
      }
      throw new Error("No route found");
    }

    async fetchPermissions(): Promise<any> {
      return await new Promise<void>(async (resolve) => {
        this.api.auth().get("user/permissions/user-permissions")
          .subscribe((res: string[]) => {
            this.userPermissions = res;
            resolve();
        });
      });
    }
}
import { isPlatformBrowser } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectorRef,
  Compiler,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Injector,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ApiProvider } from "@providers/api";
import { isUndefined } from 'lodash';
import { Subscription } from "rxjs";
import { UserProvider } from "@providers/user/user.provider";
import { MatDialog } from "@angular/material/dialog";
import { addIconUrl } from "app/helpers/icon-url";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnDestroy, AfterViewInit {

  isLogged = false;
  userData = undefined;
  userAccountData;
  isAdmin = false;
  isShownAccountData = false;
  currentWindowPosition: number;

  showProfileMenu = false;
  showInfoMenu = false;
  showPricesMenu = false;
  elevate = false;

  countUnseen = 0;
  countAnnouncements = 0;
  private subscriptions: Subscription[] = [];
  private timerId: any;

  isProduction = false;

  showEmailError = false;

  placeholderHeight = 85;

  @ViewChild("accountData", {read: ViewContainerRef})
  accountDataContainer: ViewContainerRef;

  constructor(private user: UserProvider,
              private api: ApiProvider,
              private router: Router,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              @Inject(PLATFORM_ID) private platformId,
              private dialog: MatDialog,
              private cd: ChangeDetectorRef,
              private injector: Injector) {
  
    const fn = addIconUrl.bind(null, platformId);

    iconRegistry.addSvgIcon("logo",
      sanitizer.bypassSecurityTrustResourceUrl(
        fn("assets/svg/logo.svg")));
        
    iconRegistry.addSvgIcon("profile",
      sanitizer.bypassSecurityTrustResourceUrl(
        fn("assets/svg/profile.svg")));

    this.subscriptions.push(
      this.user.isLoggedAsync().subscribe((isLogged: boolean) => {
        this.isLogged = isLogged;
        if (isLogged === true) {
          this.userData = this.user.getUserData();
          this.isAdmin = this.userData.type === 2;
          this.userData = this.user.getUserData();
        } else {
          this.isAdmin = false;
          this.userData = undefined;
        }
      })
    );
  }


  headerHeightChanged(height: number): void {
    this.placeholderHeight = height;
    this.cd.detectChanges();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {}, 2000);
    }
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll(event) {
    if (!isUndefined(event)) {
      if (!isUndefined(event.srcElement)) {
        if (!isUndefined(event.srcElement.defaultView)) {
          if (event.srcElement.defaultView.pageYOffset <
              this.currentWindowPosition) {
            this.elevate = false;
          } else if (event.srcElement.defaultView.pageYOffset > 100) {
            this.elevate = true;
          } else {
            this.elevate = false;
          }
          this.currentWindowPosition = event.srcElement.defaultView.pageYOffset;
        }
      } else if (!isUndefined(event.path?.[1])) {
        const window = event.path[1];
        if (window.scrollY < this.currentWindowPosition) {
          this.elevate = false;
        } else if (window.scrollY > 100) {
          this.elevate = true;
        } else {
          this.elevate = false;
        }
        this.currentWindowPosition = window.scrollY;
      }
    }
  }

 logout(): void {
    this.user.logout();
  }

  navigateTo(url: string): void {
    this.router.navigate([url]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });

    if (!isUndefined(this.timerId)) {
      clearInterval(this.timerId);
    }
  }
}

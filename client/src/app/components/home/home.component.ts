import { AfterViewInit, Component, HostListener } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ApiProvider } from "app/providers/api";
import { UserProvider } from "app/providers/user";

type Post = {
	id: number;
	userId: number;
	title: string;
	description: string;
	image?: any;
}

@Component({
        selector: "app-home-component",
        templateUrl: "./home.component.html",
        styleUrls: ["./home.component.scss"]
    })
  
export class HomeComponent {
		isLogged = false;
		posts: any = [];
		fetchingPosts = false;
    constructor(private api: ApiProvider,
								private router: Router,
								private user: UserProvider,
								private sanitizer: DomSanitizer,
								private iconRegistry: MatIconRegistry,) {
									this.iconRegistry.addSvgIcon("right-arrow",
									this.sanitizer.bypassSecurityTrustResourceUrl(
											"assets/svg/arrow-right-short.svg"))

			this.fetchingPosts = true;
			setTimeout(() => {
			this.api.auth().get("home/random-posts")
				.subscribe((res: Post[]) => {
					console.log(res);
					this.posts = res;
					this.fetchingPosts = false;
				});
			}, 2000); // FOR SHOWCASING PURPOSES

			this.isLogged = this.user.isLogged();
    }

		navigateTo(url: string) {
			this.router.navigate([url]);
		}
}
import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserPostComponent } from "@components/user-post/user-post.component";
import { UserPostModule } from "./user-posts.module";

const routes: Routes = [
    {
        path: '',
        component: UserPostComponent
    },
];

export const routing: ModuleWithProviders<UserPostModule> = 
    RouterModule.forChild(routes);
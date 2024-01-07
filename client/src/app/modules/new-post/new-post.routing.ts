import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewPostComponent } from "@components/new-post/new-post.component";
import { NewPostModule } from "./new-post.module";

const routes: Routes = [
    {
        path: '',
        component: NewPostComponent
    },
];

export const routing: ModuleWithProviders<NewPostModule> = 
    RouterModule.forChild(routes);
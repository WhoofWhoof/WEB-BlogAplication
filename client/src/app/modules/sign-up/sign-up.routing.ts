import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignUpPageComponent } from "../../components/sign-up/sign-up-page.component";
import { SignUpModule } from "./sign-up.module";

const routes: Routes = [
    {
        path: '',
        component: SignUpPageComponent
    },
];

export const routing: ModuleWithProviders<SignUpModule> = 
    RouterModule.forChild(routes);
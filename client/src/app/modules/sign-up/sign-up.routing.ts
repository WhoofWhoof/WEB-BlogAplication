import { ModuleWithProviders } from "@angular/core";
import { LoginModule } from "../login/login.module";
import { RouterModule, Routes } from "@angular/router";
import { SignUpPageComponent } from "../../components/sign-up/sign-up-page.component";

const routes: Routes = [
    {
        path: '',
        component: SignUpPageComponent
    },
];

export const routing: ModuleWithProviders<LoginModule> = 
    RouterModule.forChild(routes);
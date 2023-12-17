import { ModuleWithProviders } from "@angular/core";
import { LoginPageComponent } from "../../components/login/login-page.component";
import { LoginModule } from "./login.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: '',
        component: LoginPageComponent
    },
];

export const routing: ModuleWithProviders<LoginModule> = 
    RouterModule.forChild(routes);
import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "@components/home/home.component";
import { HomeModule } from "./home.module";

const routes: Routes = [
    {path: "", component: HomeComponent}
];

export const routing: ModuleWithProviders<HomeModule> =
    RouterModule.forChild(routes);

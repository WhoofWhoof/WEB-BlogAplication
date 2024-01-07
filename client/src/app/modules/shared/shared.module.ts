import { NgModule } from "@angular/core";
import { PermissionDirective } from "@directives/permission.directive";
import { SpinnerModule } from "../spinner/spinner.module";

@NgModule({
    providers: [],
    imports: [
        SpinnerModule
    ],
    declarations: [
        PermissionDirective
    ],
    exports: [
        PermissionDirective,
        SpinnerModule
    ]
})

export class SharedModule {}
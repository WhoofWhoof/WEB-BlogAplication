import { NgModule } from "@angular/core";
import { PermissionDirective } from "src/app/directives/permission.directive";

@NgModule({
    providers: [],
    imports: [],
    declarations: [
        PermissionDirective
    ],
    exports: [
        PermissionDirective
    ]
})

export class SharedModule {}
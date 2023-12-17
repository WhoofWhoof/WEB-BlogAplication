import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from '../../app/auth/permission.service';
import { isNil } from 'lodash';

@Directive({
  selector: '[appRights]'
})

export class PermissionDirective {
  private hasView = false;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private permissionService: PermissionService) {}

  @Input() set appRights(rights: string[]) {
    this.updateView(rights);
  }

  private async updateView(rights: string[]) {
    if (isNil(rights)) {
      this.createView();
      return;
    }

    const hasAccess = await this.permissionService.hasAccess(rights);
    if (hasAccess && !this.hasView) {
      this.createView();
    } else {
      if (!hasAccess && this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    }
  }

  private createView() {
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.hasView = true;
  }
}

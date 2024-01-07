import { Component, Inject, Input } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { isUndefined } from "lodash";

@Component({
  selector: "app-confirm-dialog",
  styleUrls: [`./confirm-dialog.component.scss`],
  template: `
      <div class="container">
      <h1 mat-dialog-title>
        {{ title }}
      </h1>
      <div mat-dialog-content class="content">
        <p>{{ message }}</p>
        <p>
          <b>{{ warning }}</b>
        </p>
      <div mat-dialog-actions class="actions">
        <button mat-raised-button 
          class="button close"
        (click)="closeDialog(false)">
          Cancel
        </button>

        <button mat-raised-button 
        class="button"
        [ngClass]="{
          'accept-delayed enabled': this.delayTime !== 0,
          'success': this.delayTime === 0
        }"
        [disabled]="disableSave"
        (click)="closeDialog(true)">
          Save
      </button>
      </div>
    </div>
  `,
})

export class ConfirmDialogComponent {

  disableSave: boolean = true;
  public title = "";
  public message = "";
  public warning = "This action cannot be undone.";
  public delayTime = 0;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    )  {
      this.title = data.title;
      this.message = data.message;
      if (!isUndefined(data.warning)) {
        this.warning = data.warning;
      }
      if (!isUndefined(data.delayTime)) {
        this.delayTime = data.delayTime;
      }
    }

  ngOnInit() {
    setTimeout(() => {
      this.disableSave = false;
    }, this.delayTime);
  }

  closeDialog(success: boolean) {
    if (success === false) {
      this.dialogRef.close({
        success: false,
      });
      return;
    }
    this.dialogRef.close({
      success: true
    })
  }
}
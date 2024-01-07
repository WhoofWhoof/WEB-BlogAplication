import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-admin-edit-user-dialog",
    styleUrls: [`./admin-edit-user-dialog.component.scss`],
    template: `
        <div class="container">
          <h1 mat-dialog-title class="mat-h1">Edit user</h1>
        <div mat-dialog-content class="content">
          <form [formGroup]="form">
            <mat-form-field appearance="outline">
                <mat-label>Email</mat-label>
                <input matInput formControlName="Email">
            </mat-form-field>
            <mat-form-field appearance="outline">
                <mat-label>New Password</mat-label>
                <input matInput formControlName="Password">
            </mat-form-field>
          </form>
            <p>
          <b>Atentie: operatia este ireversibila</b>
        </p>
        </div>
        <div mat-dialog-actions class="actions">
          <button mat-raised-button 
            class="button close"
          (click)="closeDialog(false)">
            Cancel
          </button>

          <button mat-raised-button 
          class="button"
          [ngClass]="{
            'accept-delayed enabled': this.delayTime !== 0 && form.valid,
            'success': this.delayTime === 0
          }"
          [disabled]="disableSave || form.invalid"
          (click)="closeDialog(true)">
            Save
        </button>
        </div>
      </div>
    `,
})

export class AdminEditUserDialogComponent {
    disableSave: boolean = true;
    delayTime: number = 3000;
    form: FormGroup = new FormGroup({
      Email: new FormControl("", Validators.required),
      Password: new FormControl("", Validators.required),
    });
    constructor(
      public dialogRef: MatDialogRef<AdminEditUserDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.form.controls.Email.setValue(data.email);
      this.form.controls.Password.setValue(data.password);
    }

    //make save button be avaliable after 3 seconds
    // make a animation for the save button
    // ngOnInit() {
    //   setTimeout(() => {
    //     this.disableSave = false;
    //   }, this.delayTime);
    // }

    closeDialog(success: boolean) {
      if (success === false) {
        this.dialogRef.close({
          success: false,
        });
        return;
      }
      this.dialogRef.close({
        success: true,
        data: {
          id: this.data.id,
          email: this.data.email,
          password: this.data.password,
        }
      })
    }
}
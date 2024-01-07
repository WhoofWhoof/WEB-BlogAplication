import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-success-snack-bar',
  templateUrl: './success-snack-bar.component.html',
  styleUrls: ['./success-snack-bar.component.scss'],
})
export class SuccessSnackBarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

}

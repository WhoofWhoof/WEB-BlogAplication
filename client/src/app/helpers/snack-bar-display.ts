import { MatSnackBar } from "@angular/material/snack-bar";
import { ErrorSnackBarComponent } from "@components/snack-bars/error-snack-bar/error-snack-bar.component";
import { SuccessSnackBarComponent } from "@components/snack-bars/success-snack-bar/success-snack-bar.component";

export class SnackBarDisplay {

  static instance: SnackBarDisplay;

  static initializeInstance(snackBar: MatSnackBar): void {
    SnackBarDisplay.instance = new SnackBarDisplay(snackBar);
  }

  static getInstance(): SnackBarDisplay {
    if (!SnackBarDisplay.instance) {
      throw new Error("SnackBarDisplay is not initialized");
    }

    return SnackBarDisplay.instance;
  }

  constructor(private snackBar: MatSnackBar) {}

  public success(msg: string, duration = 5000): void {
    this.snackBar.openFromComponent(SuccessSnackBarComponent, {
      data: {
        message: msg
      },
      panelClass: "success-snack-bar",
      duration: duration
    });
  }

  public error(msg: string, duration = 5000): void {
    this.snackBar.openFromComponent(ErrorSnackBarComponent, {
      data: {
        message: msg
      },
      panelClass: "error-snack-bar",
      duration: duration
    });
  }

}

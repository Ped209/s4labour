import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  config: MatSnackBarConfig = {
    horizontalPosition: 'center',
    verticalPosition: 'top',
    duration: 5000,
    panelClass: ['error-snackbar']
  };

  displayError(errorMessage: string) {
    this.snackBar.open(errorMessage, 'close', this.config);
  }

  displaySuccess(message: string) {
    const successConfig: MatSnackBarConfig = {
      ...this.config,
      panelClass: ['success-snackbar']
    };
    this.snackBar.open(message, 'close', successConfig);
  }
}
import { inject, Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class Core {
   private _snackBar = inject(MatSnackBar)

    durationInSeconds = 5;

  openSnackBar(message:any) {
    this._snackBar.open(message, 'close' ,{
      duration: this.durationInSeconds * 1000,
      verticalPosition:'top',

    });
  }
}

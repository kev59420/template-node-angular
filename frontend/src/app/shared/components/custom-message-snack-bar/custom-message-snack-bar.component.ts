import { Component, Inject, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-message-snack-bar',
  templateUrl: './custom-message-snack-bar.component.html',
  styleUrls: ['./custom-message-snack-bar.component.scss']
})
export class CustomMessageSnackBarComponent {
  snackBarRef = inject(MatSnackBarRef);
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { type: 'success' | 'error' | 'info' , content: string}) { }
}

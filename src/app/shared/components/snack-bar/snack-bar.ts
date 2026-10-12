import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  imports: [MatButtonModule],
  selector: 'app-snack-bar',
  styleUrl: './snack-bar.css',
  templateUrl: './snack-bar.html',
})
export class SnackBar {
  private snackBarRef = inject(MatSnackBarRef);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {}

  preferiti() {
    this.dialog.closeAll();
    this.router.navigate(['/preferiti']);
  }
}

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CocktailsService } from '../../services/cocktails/cocktails.service';
import { map, Subscription } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';

@Component({
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatListModule,
  ],
  selector: 'app-dettaglio-cocktail',
  styleUrl: './dettaglio-cocktail.css',
  templateUrl: './dettaglio-cocktail.html',
})
export class DettaglioCocktail {
  readonly data = inject<number>(MAT_DIALOG_DATA);
  cocktailService = inject(CocktailsService);
  dettaglioCocktailSub!: Subscription;
  readonly cocktail = toSignal(
    this.cocktailService.getCocktailById(this.data).pipe(map((res) => res.drinks[0])),
  );
}

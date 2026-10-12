import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { DettaglioCocktailDto, IngredienteDettaglio } from '../../models/dettaglioCocktail';
import { Error } from '../error/error';
import { CocktailsService } from '../../../services/cocktails/cocktails.service';

@Component({
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatListModule,
    Error,
  ],
  selector: 'app-dettaglio-cocktail',
  styleUrl: './dettaglio-cocktail.css',
  templateUrl: './dettaglio-cocktail.html',
})
export class DettaglioCocktail {
  private data = inject<number>(MAT_DIALOG_DATA);
  private cocktailsService = inject(CocktailsService);
  private refreshTrigger = signal<number>(0);

  hasError = signal<boolean>(false);
  cocktail = toSignal(
    toObservable(this.refreshTrigger).pipe(
      tap(() => this.hasError.set(false)),
      switchMap(() =>
        this.cocktailsService.getCocktailById(this.data).pipe(
          map((res) => res.drinks[0]),
          catchError((error) => {
            this.hasError.set(true);
            return of(null);
          }),
        ),
      ),
    ),
    { initialValue: undefined },
  );

  getDettaglioIngredienti(cocktail: DettaglioCocktailDto | undefined): IngredienteDettaglio[] {
    if (!cocktail) {
      return [];
    }

    const risultato: IngredienteDettaglio[] = [];

    for (let i = 1; i <= 15; i++) {
      const nome = cocktail[`strIngredient${i}`];

      if (nome && nome.trim() !== '') {
        const misura = cocktail[`strMeasure${i}`] || '';
        risultato.push({ nome: nome.trim(), misura: misura.trim() });
      }
    }

    return risultato;
  }

  ricaricaCocktail(): void {
    this.refreshTrigger.update((val) => val + 1);
  }
}

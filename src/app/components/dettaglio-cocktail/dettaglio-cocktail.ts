import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CocktailsService } from '../../services/cocktails/cocktails.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { FeedbackService } from '../../services/feedback/feedback.service';
import { FeedbackConfig } from '../../models/feedback';
import { CocktailApiResponse } from '../../models/dettaglioCocktail';
import { Error } from '../error/error';

export interface IngredienteDettaglio {
  nome: string;
  misura: string;
}

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
  feedback: FeedbackConfig = {
    aperto: true,
    positivo: false,
    messaggio: 'Errore',
  };
  feedbackService = inject(FeedbackService);
  readonly data = inject<number>(MAT_DIALOG_DATA);
  cocktailsService = inject(CocktailsService);
  hasError = signal<boolean>(false);
  private readonly refreshTrigger = signal<number>(0);
  readonly cocktail = toSignal(
    toObservable(this.refreshTrigger).pipe(
      tap(() => this.hasError.set(false)),
      switchMap(() =>
        this.cocktailsService.getCocktailById(this.data).pipe(
          map((res) => res.drinks[0]),
          catchError((error) => {
            this.hasError.set(true);
            this.feedbackService.setFeedback.set(this.feedback);
            return of(null);
          }),
        ),
      ),
    ),
    { initialValue: undefined },
  );

  getDettaglioIngredienti(cocktail: CocktailApiResponse | undefined): IngredienteDettaglio[] {
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

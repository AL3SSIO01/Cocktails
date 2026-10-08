import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CocktailsService } from '../../services/cocktails/cocktails.service';
import { catchError, map, of, Subscription } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { Feedback } from '../feedback/feedback';
import { FeedbackService } from '../../services/feedback/feedback.service';
import { FeedbackConfig } from '../../models/feedback';

@Component({
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatListModule,
    Feedback,
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
  dettaglioCocktailSub!: Subscription;
  readonly cocktail = toSignal(
    this.cocktailsService.getCocktailById(this.data).pipe(
      map((res) => res.drinks[0]),
      catchError((error) => {
        console.log(error);
        this.feedbackService.setFeedback.set(this.feedback);
        return of(null);
      }),
    ),
  );
}

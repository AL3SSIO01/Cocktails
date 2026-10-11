import { Component, inject, Input } from '@angular/core';
import { Cocktail } from '../../models/cocktail';
import { CocktailsService } from '../../services/cocktails/cocktails.service';
import { DettaglioCocktail } from '../../components/dettaglio-cocktail/dettaglio-cocktail';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  imports: [MatDialogModule],
  selector: 'app-card',
  styleUrl: './card.css',
  templateUrl: './card.html',
})
export class Card {
  cocktailsService = inject(CocktailsService);
  @Input() cocktail!: Cocktail;
  readonly dialog = inject(MatDialog);

  openDialog(id: number) {
    this.dialog.open(DettaglioCocktail, {
      data: id,
      width: '720px',
      maxWidth: '90vw',
    });
  }
}

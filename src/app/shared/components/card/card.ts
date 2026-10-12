import { Component, inject, Input } from '@angular/core';
import { Cocktail } from '../../models/cocktail';
import { DettaglioCocktail } from '../../components/dettaglio-cocktail/dettaglio-cocktail';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CocktailsService } from '../../../services/cocktails/cocktails.service';

@Component({
  imports: [MatDialogModule],
  selector: 'app-card',
  styleUrl: './card.css',
  templateUrl: './card.html',
})
export class Card {
  private cocktailsService = inject(CocktailsService);
  private dialog = inject(MatDialog);

  @Input() cocktail!: Cocktail;

  openDialog(id: number) {
    this.dialog.open(DettaglioCocktail, {
      data: id,
      width: '720px',
      maxWidth: '90vw',
    });
  }
}

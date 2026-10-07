import { Component, computed, inject, Input, OnInit, Signal } from '@angular/core';
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
export class Card implements OnInit {
  cocktailsService = inject(CocktailsService);
  @Input() cocktail!: Cocktail;
  cocktailsPreferiti!: Signal<Cocktail[]>;
  preferitiIds = computed(() => new Set(this.cocktailsPreferiti().map((c) => c.idDrink)));
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.cocktailsPreferiti = this.cocktailsService.getCocktailsPreferiti;
  }

  gestisciPreferiti(cocktail: Cocktail) {
    if (this.cocktailsPreferiti().includes(cocktail)) {
      this.cocktailsService.setCocktailsPreferiti.set(
        this.cocktailsPreferiti().filter((c) => c.idDrink != cocktail.idDrink),
      );
    } else {
      this.cocktailsService.setCocktailsPreferiti.set([...this.cocktailsPreferiti(), cocktail]);
    }
    console.log(this.cocktailsPreferiti());
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(DettaglioCocktail, {
      data: id,
      width: '720px',
      maxWidth: '90vw',
    });

    /*     dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    }); */
  }
}

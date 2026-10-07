import { Component, computed, inject, Input, OnInit, Signal } from '@angular/core';
import { Cocktail } from '../../models/cocktail';
import { CocktailsService } from '../../services/cocktails/cocktails.service';

@Component({
  imports: [],
  selector: 'app-card',
  styleUrl: './card.css',
  templateUrl: './card.html',
})
export class Card implements OnInit {
  cocktailsService = inject(CocktailsService);
  @Input() cocktail!: Cocktail;
  cocktailsPreferiti!: Signal<Cocktail[]>;
  preferitiIds = computed(() => new Set(this.cocktailsPreferiti().map((c) => c.idDrink)));

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
}

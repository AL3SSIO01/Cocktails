import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CocktailsService } from '../../services/cocktails/cocktails.service';
import { Cocktail } from '../../models/cocktail';
import { Card } from '../../components/card/card';

@Component({
  imports: [RouterLink, Card],
  selector: 'app-preferiti',
  styleUrl: './preferiti.css',
  templateUrl: './preferiti.html',
})
export class Preferiti implements OnInit {
  cocktailsService = inject(CocktailsService);
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

  svuotaPreferiti() {
    this.cocktailsService.setCocktailsPreferiti.set([]);
  }
}

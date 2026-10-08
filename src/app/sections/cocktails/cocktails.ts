import { Component, computed, inject, OnDestroy, OnInit, Signal, signal } from '@angular/core';
import { CocktailsService } from '../../services/cocktails/cocktails.service';
import { Cocktail, Drinks } from '../../models/cocktail';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Card } from '../../components/card/card';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../services/loader/loader.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export type TipoFiltro = 'tutti' | 'alcolici' | 'analcolici';
export type TipoOrdinamento = 'asc' | 'desc' | '';

@Component({
  selector: 'app-cocktails',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, Card, MatProgressSpinnerModule],
  templateUrl: './cocktails.html',
  styleUrl: './cocktails.css',
})
export class Cocktails implements OnInit, OnDestroy {
  loaderService = inject(LoaderService);
  cocktailsService = inject(CocktailsService);
  cocktails = signal<Cocktail[]>([]);
  cocktailsPreferiti!: Signal<Cocktail[]>;
  cocktail = new FormControl();
  listaNonFiltrata: Cocktail[] = [];
  filtroSelezionato = signal<TipoFiltro>('tutti');
  sortType = signal<TipoOrdinamento>('');
  preferitiIds = computed(() => new Set(this.cocktailsPreferiti().map((c) => c.idDrink)));
  search!: Subscription;
  loader = this.loaderService.getLoader;

  ngOnInit(): void {
    this.cocktailsPreferiti = this.cocktailsService.getCocktailsPreferiti;
    //this.searchCocktails();
  }

  ngOnDestroy(): void {
    this.search?.unsubscribe();
  }

  searchCocktails() {
    this.loaderService.setLoader.set(true);
    this.filtroSelezionato.set('tutti');
    this.search = this.cocktailsService.searchCocktails(this.cocktail.value).subscribe({
      next: (res: Drinks) => {
        if (typeof res.drinks == 'string') {
          this.cocktails.set([]);
        } else {
          this.cocktails.set(res.drinks);
          this.listaNonFiltrata = res.drinks;
        }
        this.loaderService.setLoader.set(false);
      },
      error: () => {
        this.loaderService.setLoader.set(false);
      },
    });
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

  sort(e: any) {
    if (e == 'asc') {
      this.cocktails.set(this.cocktails()?.sort((a, b) => a.strDrink.localeCompare(b.strDrink)));
    } else if (e == 'desc') {
      this.cocktails.set(this.cocktails()?.sort((a, b) => b.strDrink.localeCompare(a.strDrink)));
    }
    this.sortType.set(e);
  }

  filtra(tipo: string) {
    if (tipo == 'tutti') {
      this.filtroSelezionato.set('tutti');
      this.cocktails.set(this.listaNonFiltrata);
      this.sort(this.sortType());
    } else if (tipo == 'alcolici') {
      this.filtroSelezionato.set('alcolici');
      this.cocktails.set(this.listaNonFiltrata?.filter((c) => c.strAlcoholic == 'Alcoholic'));
      this.sort(this.sortType());
    } else {
      this.filtroSelezionato.set('analcolici');
      this.cocktails.set(this.listaNonFiltrata?.filter((c) => c.strAlcoholic == 'Non alcoholic'));
      this.sort(this.sortType());
    }
  }
}

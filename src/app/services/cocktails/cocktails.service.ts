import { computed, inject, Service, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PATH } from '../../constants/api-paths';
import { HttpClient } from '@angular/common/http';
import { Cocktail, Drinks } from '../../models/cocktail';
import { Drink } from '../../models/dettaglioCocktail';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBar } from '../../components/snack-bar/snack-bar';

@Service()
export class CocktailsService {
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);

  searchCocktails(cocktail: string): Observable<Drinks> {
    const baseUrl = API_PATH.search + `?s=${cocktail}`;
    return this.http.get<Drinks>(baseUrl);
  }

  getCocktailById(id: number): Observable<Drink> {
    const baseUrl = API_PATH.searchById + `?i=${id}`;
    return this.http.get<Drink>(baseUrl);
  }

  gestisciPreferiti(cocktail: Cocktail) {
    if (this.setCocktailsPreferiti().includes(cocktail)) {
      this.setCocktailsPreferiti.set(
        this.setCocktailsPreferiti().filter((c) => c.idDrink != cocktail.idDrink),
      );
    } else {
      this.setCocktailsPreferiti.set([...this.setCocktailsPreferiti(), cocktail]);
      this.snackBar.openFromComponent(SnackBar, {
        duration: 4000,
        data: cocktail.strDrink,
      });
    }
  }

  preferitiIds = computed(() => new Set(this.setCocktailsPreferiti().map((c) => c.idDrink)));

  setCocktailsPreferiti = signal<Cocktail[]>([]);
  getCocktailsPreferiti = this.setCocktailsPreferiti.asReadonly();
}

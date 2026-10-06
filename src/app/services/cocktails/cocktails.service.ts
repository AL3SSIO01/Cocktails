import { inject, Service, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PATH } from '../../constants/api-paths';
import { HttpClient } from '@angular/common/http';
import { Cocktail, Drinks } from '../../models/cocktail';

@Service()
export class CocktailsService {
  private http = inject(HttpClient);

  searchCocktails(cocktail: string): Observable<Drinks> {
    const baseUrl = API_PATH.search + `?s=${cocktail}`;
    return this.http.get<Drinks>(baseUrl);
  }

  setCocktailsPreferiti = signal<Cocktail[]>([]);
  getCocktailsPreferiti = this.setCocktailsPreferiti.asReadonly();
}

export interface Cocktail {
  idDrink: number;
  strAlcoholic: string;
  strCategory: string;
  strDrink: string;
  strDrinkThumb: string;
}

export interface Drinks {
  drinks: Cocktail[];
}

export interface Cocktail {
  idDrink: number;
  strAlcoholic: string;
  strCategory: string;
  strDrink: string;
  strDrinkThumb: string;
  strGlass: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strInstructionsIT: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
}

export interface Drinks {
  drinks: Cocktail[];
}

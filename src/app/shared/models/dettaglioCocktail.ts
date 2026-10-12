export interface DettaglioCocktailDto {
  strDrink: string;
  idDrink: number;
  strAlcoholic: string;
  strCategory: string;
  strDrinkThumb: string;
  strGlass: string;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
  strInstructionsIT: string;
  strInstructions: string;
}

export interface Drink {
  drinks: DettaglioCocktailDto[];
}

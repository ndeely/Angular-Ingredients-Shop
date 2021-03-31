import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

import {Ingredient} from "@shared/ingredient.model";


@Injectable({providedIn: 'root'})

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient("Sugar (g)", 500),
    new Ingredient("Flour (g)", 300),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}

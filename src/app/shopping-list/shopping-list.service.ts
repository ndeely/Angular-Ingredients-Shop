import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

import {Ingredient} from "@shared/ingredient.model";


@Injectable({providedIn: 'root'})

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient("Sugar (g)", 500),
    new Ingredient("Flour (g)", 300),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  editIngredient(index: number, newIng: Ingredient) {
    this.ingredients[index] = newIng;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}

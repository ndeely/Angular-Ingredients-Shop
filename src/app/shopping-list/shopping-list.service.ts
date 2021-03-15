import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "@shared/ingredient.model";
import {Recipe} from "@recipes/recipe.model";

@Injectable({providedIn: 'root'})

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient("Sugar (g)", 500),
    new Ingredient("Flour (g)", 300)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}

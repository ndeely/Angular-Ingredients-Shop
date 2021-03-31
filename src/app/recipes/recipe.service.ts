import {Injectable} from "@angular/core";
import { Recipe } from "@recipes/recipe.model";
import {Ingredient} from "@shared/ingredient.model";
import {ShoppingListService} from "@shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      "Tiramisu",
      "This is a whopper tiramisu!",
      "https://upload.wikimedia.org/wikipedia/commons/f/fc/Tiramisu_with_blueberries_and_raspberries%2C_July_2011.jpg",
      [
        new Ingredient("Cream", 1),
        new Ingredient("Ladyfingers", 20),
        new Ingredient("Ice Cream", 2),
        new Ingredient("Rum", 1)
      ]
    ),
    new Recipe(
      "Ice Cream",
      "This is a whopper tiramisu!",
      "https://upload.wikimedia.org/wikipedia/commons/f/fc/Tiramisu_with_blueberries_and_raspberries%2C_July_2011.jpg",
      [
        new Ingredient("Milk", 1),
        new Ingredient("Cream", 1),
        new Ingredient("Butter", 12)
      ]
    )
  ];

  constructor(private sls: ShoppingListService) {}

  //returns copy of recipes array
  getRecipes() {
    return this.recipes.slice();
  }

  //returns single recipe by id
  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.sls.addIngredients(ingredients);
  }

  deleteRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
    this.recipesChanged.next(this.recipes);
  }
}

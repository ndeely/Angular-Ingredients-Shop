import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";

import {Recipe} from "@recipes/recipe.model";
import {DataStorageService} from "@shared/data-storage.service";
import {RecipeService} from "@recipes/recipe.service";

@Injectable({providedIn: "root"})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private dss: DataStorageService,
              private rs: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot) {
    const recipes = this.rs.getRecipes();

    if (recipes.length === 0) {
      return this.dss.fetchRecipes();
    } else {
      return recipes;
    }
  }
}

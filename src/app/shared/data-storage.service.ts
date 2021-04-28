import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";

import {RecipeService} from "@recipes/recipe.service";
import {Recipe} from "@recipes/recipe.model";
import {AuthService} from "../auth/auth.service";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(private http: HttpClient,
              private rs: RecipeService,
              private as: AuthService
              ) {}

  storeRecipes() {
    const recipes = this.rs.getRecipes();
    return this.http.put(
      'https://angular-shop-d6060-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipes
    ).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(
      'https://angular-shop-d6060-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
    ).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }),
      tap(recipes => {
        this.rs.setRecipes(recipes);
      })
    );
  }
}

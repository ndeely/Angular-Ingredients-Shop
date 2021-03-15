import { Component, OnInit } from '@angular/core';
import { Recipe } from '@recipes/recipe.model';
import {RecipeService} from "@recipes/recipe.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  clickedRecipe: Recipe;

  constructor(private rs: RecipeService) { }

  ngOnInit(): void {
    this.rs.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.clickedRecipe = recipe;
      }
    );
  }

}

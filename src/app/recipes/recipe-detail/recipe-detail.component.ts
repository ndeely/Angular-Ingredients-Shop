import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '@recipes/recipe.model';
import {RecipeService} from "@recipes/recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private rs: RecipeService) { }

  ngOnInit(): void {
  }

  addToCart() {
    this.rs.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  deleteRecipe() {
    this.rs.deleteRecipe(this.recipe);

  }

}

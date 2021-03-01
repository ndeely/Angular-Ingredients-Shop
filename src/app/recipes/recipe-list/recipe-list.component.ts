import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Recipe } from "@recipes/recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeClicked = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe("Tiramisu", "This is a whopper tiramisu!", "https://upload.wikimedia.org/wikipedia/commons/f/fc/Tiramisu_with_blueberries_and_raspberries%2C_July_2011.jpg")
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipeEl: Recipe) {
    this.recipeClicked.emit(recipeEl);
  }

}

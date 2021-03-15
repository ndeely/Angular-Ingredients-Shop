import { Component, OnInit } from '@angular/core';

import { Recipe } from "@recipes/recipe.model";
import {RecipeService} from "@recipes/recipe.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private rs: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.rs.getRecipes();
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '@recipes/recipe.model';
import {RecipeService} from "@recipes/recipe.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private rs: RecipeService) { }

  ngOnInit(): void {
  }

  onSelected() {
    this.rs.recipeSelected.emit(this.recipe);
  }

}

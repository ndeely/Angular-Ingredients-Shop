import { Component, OnInit } from '@angular/core';
import { Recipe } from '@recipes/recipe.model';
import {RecipeService} from "@recipes/recipe.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private rs: RecipeService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.rs.getRecipe(this.id);
      }
    )
  }

  addToCart() {
    this.rs.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  deleteRecipe() {
    this.rs.deleteRecipe(this.recipe);

  }

}

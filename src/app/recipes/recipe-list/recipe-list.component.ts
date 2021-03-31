import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import { Recipe } from "@recipes/recipe.model";
import {RecipeService} from "@recipes/recipe.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  private recipes: Recipe[];

  constructor(private rs: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this.rs.getRecipes();
    this.rs.recipesChanged.subscribe(
      (rs: Recipe[]) => {
        this.recipes = rs;
      }
    );
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  getRecipes() {
    return this.recipes.slice();
  }


}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import { Recipe } from "@recipes/recipe.model";
import {RecipeService} from "@recipes/recipe.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private recipes: Recipe[];
  private subscription: Subscription;

  constructor(private rs: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this.rs.getRecipes();
    this.subscription = this.rs.recipesChanged.subscribe(
      (rs: Recipe[]) => {
        this.recipes = rs;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  getRecipes() {
    return this.recipes.slice();
  }


}

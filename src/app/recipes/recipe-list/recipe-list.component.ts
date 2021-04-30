import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import { Recipe } from "@recipes/recipe.model";
import {RecipeService} from "@recipes/recipe.service";
import {Subscription} from "rxjs";
import {DataStorageService} from "@shared/data-storage.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private recipes: Recipe[];
  private recipeSub: Subscription;

  constructor(private rs: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this.rs.getRecipes();
    this.recipeSub = this.rs.recipesChanged.subscribe(
      (rs: Recipe[]) => {
        this.recipes = rs;
      }
    );
  }

  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  getRecipes() {
    return this.recipes.slice();
  }


}

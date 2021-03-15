import { Component, OnInit } from '@angular/core';
import { Ingredient } from "@shared/ingredient.model";
import {ShoppingListService} from "@shopping-list/shopping-list.service";
import {Recipe} from "@recipes/recipe.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private sls: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.sls.getIngredients();
    this.sls.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

}

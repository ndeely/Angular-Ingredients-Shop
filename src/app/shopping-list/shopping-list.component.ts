import {Component, OnDestroy, OnInit} from '@angular/core';
import { Ingredient } from "@shared/ingredient.model";
import {ShoppingListService} from "@shopping-list/shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  slSub: Subscription;

  constructor(private sls: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.sls.getIngredients();
    this.slSub = this.sls.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy(): void {
    this.slSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.sls.startedEditing.next(index);
  }

}

import { Component, OnInit } from '@angular/core';
import { Ingredient } from "@shared/ingredient.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient("Sugar (g)", 500),
    new Ingredient("Flour (g)", 300)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  addToList(ing: Ingredient) {
    this.ingredients.push(ing);
  }

}

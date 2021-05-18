import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import { Ingredient } from '@shared/ingredient.model';
import {ShoppingListService} from "@shopping-list/shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  ingredient: Ingredient;
  @ViewChild('f', {static: false}) slForm: NgForm;

  constructor(private sls: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.sls.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.ingredient = this.sls.getIngredient(index);
        this.slForm.setValue({
          name: this.ingredient.name,
          amount: this.ingredient.amount
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.sls.editIngredient(this.editedItemIndex, newIngredient);
      this.editMode = false;
    } else {
      this.sls.addIngredient(newIngredient);
    }
    form.reset();
  }

  onDelete() {
    if (this.editMode) {
      this.sls.deleteIngredient(this.editedItemIndex);
      this.onClear();
    }
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }

}

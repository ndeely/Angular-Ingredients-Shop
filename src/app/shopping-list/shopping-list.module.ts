import {NgModule} from "@angular/core";
import {ShoppingListComponent} from "@shopping-list/shopping-list.component";
import {ShoppingEditComponent} from "@shopping-list/shopping-edit/shopping-edit.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {ShoppingListRoutingModule} from "@shopping-list/shopping-list-routing.module";

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ShoppingListRoutingModule
  ]
})
export class ShoppingListModule {

}

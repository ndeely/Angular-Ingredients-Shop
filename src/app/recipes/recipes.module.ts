import {NgModule} from "@angular/core";
import {RecipesComponent} from "@recipes/recipes.component";
import {RecipeListComponent} from "@recipes/recipe-list/recipe-list.component";
import {RecipeDetailComponent} from "@recipes/recipe-detail/recipe-detail.component";
import {RecipeItemComponent} from "@recipes/recipe-list/recipe-item/recipe-item.component";
import {RecipeStartComponent} from "@recipes/recipe-start/recipe-start.component";
import {RecipeEditComponent} from "@recipes/recipe-edit/recipe-edit.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {RecipesRoutingModule} from "@recipes/recipes-routing.module";
import {DropdownDirective} from "@shared/dropdown.directive";
import {SharedModule} from "@shared/shared.module";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule
  ]
})
export class RecipesModule {

}

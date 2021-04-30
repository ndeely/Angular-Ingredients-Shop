import { ShoppingListService } from '@shopping-list/shopping-list.service';
import { RecipeService } from '@recipes/recipe.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { HeaderComponent } from '@header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {PlaceholderDirective} from "@shared/placeholder/placeholder.directive";
import {RecipesModule} from "@recipes/recipes.module";
import {ShoppingListModule} from "@shopping-list/shopping-list.module";
import {AuthModule} from "./auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule,
    AuthModule
  ],
  providers: [
    RecipeService,
    ShoppingListService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

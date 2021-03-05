import { Injectable, OnInit } from "@angular/core";
import { Recipe } from "@recipes/recipe.model";

@Injectable({providedIn: 'root'})

export class RecipeService implements OnInit {
    recipes: Recipe[];

    ngOnInit() {
        this.recipes.push(
            new Recipe(
                "Tiramisyyy", 
                "This is a whopper tiramisu!", 
                "https://upload.wikimedia.org/wikipedia/commons/f/fc/Tiramisu_with_blueberries_and_raspberries%2C_July_2011.jpg"
            )
        );
    }
}
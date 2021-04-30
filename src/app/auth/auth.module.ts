import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {AuthComponent} from "./auth.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {LoadingSpinnerComponent} from "@shared/loading-spinner/loading-spinner.component";
import {AlertComponent} from "@shared/alert/alert.component";

@NgModule({
  declarations: [
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ],
  exports: [
    LoadingSpinnerComponent,
    AlertComponent
  ]
})
export class AuthModule {}

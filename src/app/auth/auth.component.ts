import {Component, OnDestroy, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";

import {AuthResponseData, AuthService} from "./auth.service";
import {PlaceholderDirective} from "@shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

  private authObs: Observable<AuthResponseData>;

  constructor(
    private as: AuthService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    if (this.isLoginMode) {
      this.authObs = this.as.login(email, password);
    } else {
      this.authObs = this.as.signUp(email, password);
    }

    this.authObs.subscribe(
      resData => {
        // console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }
}

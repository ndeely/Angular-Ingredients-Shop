import {Component, ComponentFactoryResolver, OnDestroy, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";

import {AuthResponseData, AuthService} from "./auth.service";
import {AlertComponent} from "@shared/alert/alert.component";
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

  private closeSub: Subscription;

  private authObs: Observable<AuthResponseData>;

  constructor(
    private as: AuthService,
    private router: Router,
    private cfr: ComponentFactoryResolver
  ) {}

  ngOnDestroy(): void {
        this.closeSub.unsubscribe();
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
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory = this.cfr.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.vcr;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(
      () => {
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear();
      }
     );
  }
}

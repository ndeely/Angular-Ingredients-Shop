import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";

import {User} from "./user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({ providedIn: "root" })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

 constructor(
   private http: HttpClient,
   private router: Router
   ) {

 }

  signUp(email: string, password: string) {
   return this.http
     .post<AuthResponseData>(
       'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBxD_wzizXsQXByUTuvANxdb0Dw9mi5E8o',
       {
           email: email,
           password: password,
           returnSecureToken: true
        }
     )
     .pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
       }
     ));
  }

  login(email: string, password: string) {
   return this.http
     .post<AuthResponseData>(
       'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBxD_wzizXsQXByUTuvANxdb0Dw9mi5E8o',
       {
          email: email,
         password: password,
         returnSecureToken: true
       }
     )
     .pipe(catchError(this.handleError), tap(resData => {
         this.handleAuthentication(
           resData.email,
           resData.localId,
           resData.idToken,
           +resData.expiresIn
         );
       }
     ));
  }

  logout() {
   this.user.next(null);
   localStorage.removeItem('userData');
   this.router.navigate(['/auth']);
   if (this.tokenExpirationTimer) {
     clearTimeout(this.tokenExpirationTimer);
   }
   this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
   this.tokenExpirationTimer = setTimeout(
     () => {
       this.logout();
     },
     expirationDuration
   );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred.';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator.';
        break;
    }
    return throwError(errorMessage);
  }

  handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.getToken() != null) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

}

import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {exhaustMap, take} from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private as: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.as.user.pipe(
      take(1),
      exhaustMap(
        user => {
          if (!user) {
            return next.handle(req);
          }
          const modifiedReq = req.clone(
            { params: new HttpParams().set('auth', user.getToken()) }
           );
           return next.handle(modifiedReq);
        }
      )
    );
  }
}

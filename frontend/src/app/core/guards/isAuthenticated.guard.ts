import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { iif, map, of, switchMap } from "rxjs";
import { AuthType } from "../enum/AuthType";

export const isAuthenticated: CanActivateFn = (route, state) => {
    const router: Router = inject(Router)
    const authService: AuthService = inject(AuthService)
    return authService.$authState.asObservable().pipe(
      map( authState => authState!! && authState.isAuthenticated()),
      switchMap( isAuthenticated => {
        return isAuthenticated ? of(true) : of(router.createUrlTree(['login']))
      })
    )
  };
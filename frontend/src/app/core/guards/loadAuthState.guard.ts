import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { EMPTY, catchError, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const loadAuthStateGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService)
  const router: Router = inject(Router)
  return (authService.isAuthenticated !== undefined) ? true : authService.getAuthenticationState().pipe(
    map( authState => {
      console.log(authState)
      authService.$authState.next(authState)
      return true
    }),
    catchError(err =>{
      return of(router.createUrlTree(['maintenance']))
    })
  )
};

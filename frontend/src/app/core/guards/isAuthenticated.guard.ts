import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const isAuthenticated: CanActivateFn = (route, state) => {
    const router: Router = inject(Router)
    const params = route.queryParams
    return true
  };
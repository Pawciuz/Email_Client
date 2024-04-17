import { CanMatchFn, Router } from '@angular/router';
import { filter, skipWhile, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanMatchFn = (route, segments) => {
  let authService = inject(AuthService);
  let router = inject(Router);
  return authService.signedIn$.pipe(
    filter((value) => value === null || value),
    take(1),
    tap((authenticated) => {
      if (!authenticated) {
        router.navigate(['/']);
      }
    }),
  );
};

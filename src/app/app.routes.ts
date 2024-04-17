import { Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'signup',
    loadComponent: () =>
      import('./auth/signup/signup.component').then(
        (mod) => mod.SignupComponent,
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./auth/signin/signin.component').then(
        (mod) => mod.SigninComponent,
      ),
  },
  {
    path: 'signout',
    loadComponent: () =>
      import('./auth/signout/signout.component').then(
        (mod) => mod.SignoutComponent,
      ),
  },
  {
    path: 'inbox',
    loadComponent: () =>
      import('./inbox/home-inbox/home-inbox.component').then(
        (mod) => mod.HomeInboxComponent,
      ),
    canMatch: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./inbox/placeholder/placeholder.component').then(
            (mod) => mod.PlaceholderComponent,
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./inbox/email-show/email-show.component').then(
            (mod) => mod.EmailShowComponent,
          ),
      },
    ],
  },
];

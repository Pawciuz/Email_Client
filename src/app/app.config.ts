import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { AuthHttpInterceptor } from './auth/auth-http-interceptor';
import { authHttpInterceptorProvider } from './httpInterceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    authHttpInterceptorProvider,
    provideRouter(routes),
    provideHttpClient(),
  ],
};

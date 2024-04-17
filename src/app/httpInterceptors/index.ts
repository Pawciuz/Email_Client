import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '../auth/auth-http-interceptor';

export const authHttpInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthHttpInterceptor,
  multi: true,
};

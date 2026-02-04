import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
<<<<<<< HEAD
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './interceptor/auth.interceptor';
=======

import { routes } from './app.routes';
>>>>>>> da613fa8b1cd79a0137dd58c041f27da24aedfdb

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
<<<<<<< HEAD
    provideRouter(routes),

    // ✅ HttpClient + Interceptor
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
  ],
=======
    provideRouter(routes)
  ]
>>>>>>> da613fa8b1cd79a0137dd58c041f27da24aedfdb
};

import { ApplicationConfig, inject, Injectable, InjectionToken, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

@Injectable({providedIn: 'root'})
export class AuthService {
  readonly authenticated = true;
  readonly version = "1.7"
}

export const APP_VERSION = new InjectionToken<string>('APP_VERSION');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    { 
      provide: APP_VERSION,
      useFactory: () => {
        return inject(AuthService).version;
      },
      deps: [AuthService]
    }
  ]
};

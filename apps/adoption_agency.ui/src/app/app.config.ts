import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { BASE_PATH as PetsServiceBasePath } from '@adoption-agency/pets-service';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    {
      provide: PetsServiceBasePath,
      useValue: environment.baseUrls.petsService
    }
  ]
};

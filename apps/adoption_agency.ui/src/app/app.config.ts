import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { BASE_PATH as PetsServiceBasePath } from '@adoption-agency/pets-service';
import { BASE_PATH as OwnersServiceBasePath } from '@adoption-agency/owners-service';
import { BASE_PATH as AdoptionServiceBasePath } from '@adoption-agency/adoption-service';
import { environment } from '../environments/environment';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideStore(),
    provideEffects(),
    {
      provide: PetsServiceBasePath,
      useValue: environment.baseUrls.petsService
    },
    {
      provide: OwnersServiceBasePath,
      useValue: environment.baseUrls.ownersService
    },
    {
      provide: AdoptionServiceBasePath,
      useValue: environment.baseUrls.adoptionService
    }
  ]
};

import { Route } from '@angular/router';
import { Pets } from './pets/pets';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromPets from './state';
import { PetsEffects } from './state/pets.effects';
import { AllPetsPage } from './pages/all-pets/all-pets.page';

export const petsRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'all-pets',
    pathMatch: 'full'
  },
  {
    path: 'all-pets',
    component: AllPetsPage,
    providers: [
      provideState(fromPets.PETS_FEATURE_KEY, fromPets.petsReducer),
      provideEffects(PetsEffects),
    ],
  },
];

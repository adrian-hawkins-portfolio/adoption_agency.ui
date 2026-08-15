import { Route } from '@angular/router';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromPets from './state';
import { PetsEffects } from './state/pets.effects';
import { AllPetsPage } from './pages/all-pets/all-pets.page';
import { PetPage } from './pages/pet/pet.page';
import { AddPetPage } from './pages/add-pet/add-pet.page';

export const petsRoutes: Route[] = [
  {
    path: '',
    providers: [
      provideState(fromPets.PETS_FEATURE_KEY, fromPets.petsReducer),
      provideEffects(PetsEffects),
    ],
    children: [
      {
        path: '',
        redirectTo: 'all-pets',
        pathMatch: 'full',
      },
      {
        path: 'all-pets',
        component: AllPetsPage,
      },
      {
        path: 'view-pet/:id',
        component: PetPage,
      },
      {
        path: 'add-pet',
        component: AddPetPage
      }
    ],
  },
];

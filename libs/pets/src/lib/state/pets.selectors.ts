import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PetsState } from './pets.reducer';
import { PetModel } from '@adoption-agency/pets-service';

export const selectPetsState = createFeatureSelector<PetsState>('pets');

export const selectAllPets = createSelector(
  selectPetsState,
  (state) => state.pets
);

export const selectPetsLoading = createSelector(
  selectPetsState,
  (state) => state.loading
);

export const selectPetsError = createSelector(
  selectPetsState,
  (state) => state.error
);

export const selectPetById = (id: number) =>
  createSelector(
    selectAllPets,
    (pets: PetModel[]): PetModel | undefined => 
          pets?.find((pet) => pet.id === id)
  );
import { createReducer, on } from '@ngrx/store';
import { PetsApiActions } from './pets.actions';
import { PetModel } from '@adoption-agency/pets-service';

export interface PetsState {
  pets: Array<PetModel>;
  loading: boolean;
  error: string | null;
}

export const initialState: PetsState = {
  pets: [],
  loading: false,
  error: null,
};

export const petsReducer = createReducer(
  initialState,
  on(PetsApiActions.loadPets, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PetsApiActions.loadPetsSuccess, (state, { pets }) => ({
    ...state,
    pets,
    loading: false,
  })),
  on(PetsApiActions.loadPetsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(PetsApiActions.setPetStatus, (state, {petId, petSatus}) => ({
    ...state,
    pets: state.pets.map(pet => pet.id === petId ? {...pet, status: petSatus} : pet),
  })),
  on(PetsApiActions.addNewPet, (state, {pet}) => ({
    ...state,
    pets: state.pets.concat(pet)
  }))
);
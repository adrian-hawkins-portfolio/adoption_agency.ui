import * as PetsActions from './pets.actions';
import * as PetsSelectors from './pets.selectors';
import { petsReducer, PetsState } from './pets.reducer';

export const PETS_FEATURE_KEY = 'pets';

export interface State {
  [PETS_FEATURE_KEY]: PetsState;
}

export { PetsActions, PetsSelectors, petsReducer };
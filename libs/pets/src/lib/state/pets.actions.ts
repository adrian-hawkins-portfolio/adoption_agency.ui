import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PetModel, Status } from '@adoption-agency/pets-service';

export const PetsApiActions = createActionGroup({
  source: 'Pets Page',
  events: {
    'Load Pets': emptyProps(),
    'Load Pets Success': props<{ pets: Array<PetModel> }>(),
    'Load Pets Failure': props<{ error: string }>(),
    'Set Pet Status': props<{petId: number, petSatus: Status}>()
  },
});
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, map, exhaustMap } from 'rxjs';
import { PetsService } from '@adoption-agency/pets-service';
import { PetsApiActions } from './pets.actions';

@Injectable()
export class PetsEffects {
private actions$ = inject(Actions);
  private petsService = inject(PetsService);

  loadPets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PetsApiActions.loadPets),
      exhaustMap(() =>
        this.petsService.getAvailablePetsPetsGet().pipe(
          map((pets) => PetsApiActions.loadPetsSuccess({ pets: pets.response })),
          catchError((error) =>
            of(PetsApiActions.loadPetsFailure({ error: error?.message ?? 'Unknown error' }))
          )
        )
      )
    )
  );
}

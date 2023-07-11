import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ConferenceService } from '../../services/organizer/conference.service';
import { loadConferences, loadConferencesSuccess, loadConferencesFailure } from '../conference/confernce.action';

@Injectable()
export class ConferenceEffects {
  loadConferences$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadConferences),
      mergeMap(() =>
        this.conferenceService.getAllconferences().pipe(
          map((conferences) => loadConferencesSuccess({ conferences })),
          
          catchError((error) => of(loadConferencesFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private conferenceService: ConferenceService) {}
}
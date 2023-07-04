import { createAction, props } from '@ngrx/store';
import { Conference } from '../conference/conference.model';


export const loadConferences = createAction('[Conference] Load Conferences');
export const loadConferencesSuccess = createAction('[Conference] Load Conferences Success', props<{ conferences: Conference[] }>());
export const loadConferencesFailure = createAction('[Conference] Load Conferences Failure', props<{ error: any }>());
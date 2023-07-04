import { createReducer, on, Action } from '@ngrx/store';
import { Conference } from '../conference/conference.model';
import { loadConferences, loadConferencesSuccess, loadConferencesFailure } from '../conference/confernce.action';

export interface ConferenceState {
  conferences: Conference[];
  loading: boolean;
  error: any;
}

export const initialState: ConferenceState = {
  conferences: [],
  loading: false,
  error: null
};

export const conferenceReducer = createReducer(
  initialState,
  on(loadConferences, (state) => ({ ...state, loading: true, error: null })),
  on(loadConferencesSuccess, (state, { conferences }) => ({ ...state, conferences, loading: false })),
  on(loadConferencesFailure, (state, { error }) => ({ ...state, error, loading: false }))
);

export function reducer(state: ConferenceState | undefined, action: Action) {
  return conferenceReducer(state, action);
}
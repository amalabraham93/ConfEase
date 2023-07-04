import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConferenceState } from './conference.reducer';

export const selectConferenceState = createFeatureSelector<ConferenceState>('conference');

export const selectConferences = createSelector(selectConferenceState, (state) => state.conferences);
export const selectConferenceLoading = createSelector(selectConferenceState, (state) => state.loading);
export const selectConferenceError = createSelector(selectConferenceState, (state) => state.error);
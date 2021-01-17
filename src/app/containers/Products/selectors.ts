import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.products || initialState;

export const selectProducts = createSelector(
  [selectDomain],
  productsState => productsState,
);

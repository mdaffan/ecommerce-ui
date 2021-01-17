import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.cart || initialState;

export const selectCart = createSelector(
  [selectDomain],
  cartState => cartState,
);

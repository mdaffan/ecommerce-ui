import { createAction, PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from 'utils/@reduxjs/toolkit'
import { ContainerState } from './types'
const getProducts = createAction('products/getProducts')
// The initial state of the Products container
export const initialState: ContainerState = {
  products: [],
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    saveProducts(state, action: PayloadAction<any>) {
      state.products = action.payload
    },
  },
})
export { getProducts }
export const {
  actions: productsActions,
  reducer,
  name: sliceKey,
} = productsSlice

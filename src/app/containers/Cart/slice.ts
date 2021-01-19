import { createAction, PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from 'utils/@reduxjs/toolkit'
import { ContainerState } from './types'
const addItemsToCart = createAction<any>('cart/addItemToCart')
const deleteItemsFromCartBucket = createAction<any>(
  'cart/deleteItemsFromCartBucket',
)
const modifyItemQuantityInCart = createAction<any>(
  'cart/modifyItemQuantityInCart',
)
// The initial state of the Cart container
export const initialState: ContainerState = {
  cartItems: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<any>) {
      state.cartItems = action.payload
    },
  },
})
export { addItemsToCart, deleteItemsFromCartBucket, modifyItemQuantityInCart }
export const { actions: cartActions, reducer, name: sliceKey } = cartSlice

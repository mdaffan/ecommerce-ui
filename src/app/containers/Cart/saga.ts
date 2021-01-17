import { take, call, put, select, takeLatest } from 'redux-saga/effects'
import { selectCart } from './selectors'
import { addItemsToCart, cartActions } from './slice'

export function* pushItemsToCart({
  payload,
}: ReturnType<typeof addItemsToCart>) {
  try {
    const state = yield select(selectCart)
    yield put(cartActions.setCartItems([...state.cartItems, payload]))
  } catch (err) {
    console.log(err)
  }
}

export function* cartSaga() {
  yield takeLatest(addItemsToCart, pushItemsToCart)
}

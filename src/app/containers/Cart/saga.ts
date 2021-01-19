import { take, call, put, select, takeLatest } from 'redux-saga/effects'
import { selectCart } from './selectors'
import {
  addItemsToCart,
  cartActions,
  deleteItemsFromCartBucket,
  modifyItemQuantityInCart,
} from './slice'

export function* pushItemsToCart({
  payload,
}: ReturnType<typeof addItemsToCart>) {
  try {
    const state = yield select(selectCart)
    let array: Array<object> = []
    let count = 1
    state.cartItems.map((item: any) =>
      item.item.id === payload.item.id && item.variant === payload.variant
        ? (count += 1)
        : array.push(item),
    )
    yield put(cartActions.setCartItems([...array, { ...payload, count }]))
  } catch (err) {
    console.log(err)
  }
}
export function* modifyItemQuantity({
  payload: { item, action },
}: ReturnType<typeof modifyItemQuantityInCart>) {
  try {
    const state = yield select(selectCart)
    let copy = [...state.cartItems]

    let index = copy.findIndex(
      (data: any) =>
        data.item.id === item.item.id && data.variant === item.variant,
    )

    yield action === 'subtract'
      ? (copy[index] = {
          ...copy[index],
          count:
            copy[index].count > 1 ? copy[index].count - 1 : copy[index].count,
        })
      : action === 'add'
      ? (copy[index] = { ...copy[index], count: copy[index].count + 1 })
      : null
    yield put(cartActions.setCartItems(copy))
  } catch (err) {
    console.log(err)
  }
}
export function* deleteItemsFromCart({
  payload: { item, clearAll = false },
}: ReturnType<typeof deleteItemsFromCartBucket>) {
  try {
    const state = yield select(selectCart)
    let copy = [...state.cartItems]

    if (clearAll) yield put(cartActions.setCartItems([]))
    else {
      let index = copy.findIndex(
        (data: any) =>
          data.item.id === item.item.id && data.variant === item.variant,
      )
      copy.splice(index, 1)
      yield put(cartActions.setCartItems(copy))
    }
  } catch (err) {
    console.log(err)
  }
}

export function* cartSaga() {
  yield takeLatest(addItemsToCart, pushItemsToCart)
  yield takeLatest(deleteItemsFromCartBucket, deleteItemsFromCart)
  yield takeLatest(modifyItemQuantityInCart, modifyItemQuantity)
}

import { call, put, takeLatest } from 'redux-saga/effects'
import { productsActions, getProducts } from './slice'
import axios from 'axios'
export function* fetchProdcuts() {
  try {
    const response = yield call(
      axios.get,
      'https://cdn.shopify.com/s/files/1/0455/2176/4502/files/products.json',
    )
    let fixResponse = response.data.lastIndexOf(',')
    let newResponse =
      response.data.substring(0, fixResponse) +
      response.data.substring(fixResponse + 1, response.data.length)

    yield put(productsActions.saveProducts(JSON.parse(newResponse)))
  } catch (err) {
    console.log(err)
  }
}

export function* productsSaga() {
  yield takeLatest(getProducts, fetchProdcuts)
}

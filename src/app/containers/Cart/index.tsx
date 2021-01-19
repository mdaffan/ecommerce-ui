/**
 *
 * Cart
 *
 */

import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled from 'styled-components/macro'
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors'
import {
  deleteItemsFromCartBucket,
  modifyItemQuantityInCart,
  reducer,
  sliceKey,
} from './slice'
import { selectCart } from './selectors'
import { cartSaga } from './saga'
import { Button, Card, Col, Row } from 'react-bootstrap'
import {
  AiOutlineClose,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from 'react-icons/ai'

interface Props {}

export function Cart(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer })
  useInjectSaga({ key: sliceKey, saga: cartSaga })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { cartItems } = useSelector(selectCart)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch()
  const getPriceOfAnItem = (item: any) => {
    let price = 0
    let listingPrice = 0
    let discount = 0
    price = item.item.price * item.count
    listingPrice = item.item.compare_at_price * item.count
    discount = ((listingPrice - price) / listingPrice) * 100
    return { price, listingPrice, discount }
  }
  const getPriceOfAllItems = () => {
    let price = 0
    let listingPrice = 0
    let discount = 0
    // eslint-disable-next-line array-callback-return
    cartItems.map((item: any) => {
      price += Number(item.item.price) * item.count
      listingPrice += Number(item.item.compare_at_price) * item.count
    })
    discount = ((listingPrice - price) / listingPrice) * 100
    return { price, listingPrice, discount }
  }
  const deleteCartItems = (item: any) => {
    dispatch(deleteItemsFromCartBucket({ item }))
  }
  const addQuantity = (item: any) => {
    dispatch(modifyItemQuantityInCart({ item, action: 'add' }))
  }
  const subtractQuantity = (item: any) => {
    dispatch(modifyItemQuantityInCart({ item, action: 'subtract' }))
  }
  return (
    <>
      <Row className="m-4">
        <Col xl={9} lg={8} md={6} sm={12}>
          <Card>
            <Card.Header>My Cart</Card.Header>
            <Card.Body>
              {cartItems.map((item: any) => (
                <div key={item.item.id} className="p-2 d-flex">
                  <img
                    css={`
                      border-radius: 4px;
                    `}
                    alt="Items"
                    src={item.item.image_src[0]}
                    height={100}
                    width={100}
                  />
                  <div className="m-2">
                    <h5>{item.item.name}</h5>
                    <h5>{item.item.vendor}</h5>
                    <div className="d-flex">
                      <span>
                        Variant:<small>{item.variant}</small>
                      </span>
                      <h6 className="ml-2">{getPriceOfAnItem(item).price}</h6>
                      <h6 className="ml-2">
                        <s> {getPriceOfAnItem(item).listingPrice}</s>
                      </h6>
                      <small className="ml-2 text-success">
                        {Math.floor(getPriceOfAnItem(item).discount) + '%'}
                      </small>
                      <p className="ml-2">Quantity:{item.count}</p>
                    </div>
                    <AiOutlineMinusCircle
                      onClick={e => subtractQuantity(item)}
                    />{' '}
                    <AiOutlinePlusCircle onClick={e => addQuantity(item)} />
                  </div>
                  <Button
                    className="ml-auto align-self-center"
                    variant="outline-danger"
                    onClick={e => deleteCartItems(item)}
                  >
                    <AiOutlineClose />
                  </Button>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} lg={4} md={6} sm={12}>
          <Card>
            <Card.Header>Price Details</Card.Header>
            <Card.Body>
              <div className="d-flex">
                <h5>Price({cartItems.length} Items)</h5>:{' '}
                <h6>{getPriceOfAllItems().listingPrice}</h6>{' '}
              </div>
              <p>
                Discount:{' '}
                {getPriceOfAllItems().listingPrice - getPriceOfAllItems().price}
              </p>
            </Card.Body>
            <Card.Footer>
              <p>Total Price: {getPriceOfAllItems().price}</p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  )
}

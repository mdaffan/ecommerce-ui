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
import { reducer, sliceKey } from './slice'
import { selectCart } from './selectors'
import { cartSaga } from './saga'
import { Card, Col, Row } from 'react-bootstrap'

interface Props {}

export function Cart(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer })
  useInjectSaga({ key: sliceKey, saga: cartSaga })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { cartItems } = useSelector(selectCart)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch()
  const getPrice = () => {
    let price = 0
    let listingPrice = 0
    let discount = 0
    cartItems.map((item: any) => {
      price += Number(item.item.price)
      listingPrice += Number(item.item.compare_at_price)
    })
    discount = ((listingPrice - price) / listingPrice) * 100
    return { price, listingPrice, discount }
  }
  return (
    <>
      <Row className="m-4">
        <Col xl={9} lg={8} md={6} sm={12}>
          <Card>
            <Card.Header>My Cart</Card.Header>
            <Card.Body>
              {cartItems.map((item: any) => (
                <div className="p-2 d-flex">
                  <img
                    css={`
                      border-radius: 4px;
                    `}
                    src={item.item.image_src[0]}
                    height={100}
                    width={100}
                  />
                  <div className="m-2">
                    <h5>{item.item.name}</h5>
                    <h5>{item.item.vendor}</h5>
                    <div className="d-flex">
                      <h6 className="ml-2">{item.item.price}</h6>
                      <h6 className="ml-2">
                        <s> {item.item.compare_at_price}</s>
                      </h6>
                      <small className="ml-2 text-success">
                        {Math.floor(
                          ((item.item.compare_at_price - item.item.price) /
                            item.item.compare_at_price) *
                            100,
                        ) + '%'}
                      </small>
                    </div>
                  </div>
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
                <h6>{getPrice().listingPrice}</h6>{' '}
              </div>
              <p>Discount: {getPrice().listingPrice - getPrice().price}</p>
            </Card.Body>
            <Card.Footer>
              <p>Total Price: {getPrice().price}</p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  )
}

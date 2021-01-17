/**
 *
 * Cart
 *
 */

import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'

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
  const cart = useSelector(selectCart)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch()

  return (
    <>
      <Row>
        <Col xl={9} lg={8} md={6} sm={12}>
          <Card>
            <Card.Header>My Cart</Card.Header>
          </Card>
        </Col>
        <Col xl={3} lg={4} md={6} sm={12}>
          <Card></Card>
        </Col>
      </Row>
    </>
  )
}

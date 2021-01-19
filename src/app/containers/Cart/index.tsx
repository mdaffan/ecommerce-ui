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
import Typography from 'app/components/Typography'

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
      {cartItems.length ? (
        <Row className="m-4">
          <Col xl={9} lg={8} md={8} sm={12}>
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
                      <Typography fontSize={'1rem'}>
                        {item.item.name}
                      </Typography>
                      <Typography fontSize={'1rem'}>
                        {item.item.vendor}
                      </Typography>
                      <div className="d-flex">
                        <Typography fontSize={'1rem'}>
                          {item.variant}
                        </Typography>
                        <Typography className="ml-2" fontSize={'1rem'}>
                          {getPriceOfAnItem(item).price}
                        </Typography>
                        <Typography className="ml-2" fontSize={'1rem'}>
                          <s> {getPriceOfAnItem(item).listingPrice}</s>
                        </Typography>
                        <Typography fontSize={'1rem'}>
                          <small className="ml-2 text-success">
                            {Math.floor(getPriceOfAnItem(item).discount) + '%'}
                          </small>
                        </Typography>

                        <p className="ml-2">Quantity: {item.count}</p>
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
          <Col className="mt-2" xl={3} lg={4} md={4} sm={12}>
            <Card>
              <Card.Header>Price Details</Card.Header>
              <Card.Body>
                <div className="d-flex">
                  <Typography fontSize={'1rem'}>
                    Price({cartItems.length} Items):{'  '}
                  </Typography>
                  <Typography fontSize={'1rem'}>
                    {getPriceOfAllItems().listingPrice}{' '}
                  </Typography>
                </div>
                <Typography fontSize={'1rem'}>
                  Discount:{' '}
                  {getPriceOfAllItems().listingPrice -
                    getPriceOfAllItems().price}
                </Typography>
              </Card.Body>
              <Card.Footer>
                <p>Total Price: {getPriceOfAllItems().price}</p>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row className="m-0">
          <div
            css={`
              display: flex;
              align-items: center;
              margin: auto;
              height: calc(100vh - 225px);
            `}
          >
            <Typography fontSize={22} fontWeight={500}>
              Cart is Empty
            </Typography>
          </div>
        </Row>
      )}
    </>
  )
}

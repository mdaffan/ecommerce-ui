/**
 *
 * Products
 *
 */

import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/macro'

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors'
import { reducer, sliceKey, getProducts } from './slice'
import { selectProducts } from './selectors'
import { productsSaga } from './saga'
import { Card, Col, Row, Container, Badge, Button } from 'react-bootstrap'
import { cartSaga } from '../Cart/saga'
import { addItemsToCart, sliceKey as cartSlice } from '../Cart/slice'
interface Props {}

export function Products(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer })
  useInjectSaga({ key: sliceKey, saga: productsSaga })
  useInjectSaga({ key: cartSlice, saga: cartSaga })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { products } = useSelector(selectProducts)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch()
  const [allProducts, setAllProducts] = React.useState<Array<object>>([])
  const [badgeClicked, setBadgeClick] = React.useState<any>({})
  React.useEffect(() => {
    if (!products.length) dispatch(getProducts())
    else setAllProducts(products)
    return () => {}
  }, [products])
  const badgeClick = (item: any, index: number) => {
    let values = { ...badgeClicked }
    values[index] = { clicked: true, value: item }
    setBadgeClick(values)
  }
  const addToCart = (item: any, index: number) => {
    let values = { ...badgeClicked }
    values[index] = { ...values[index], clicked: false }
    setBadgeClick(values)
    dispatch(addItemsToCart({ item, variant: values[index].value }))
  }
  return (
    <>
      <Container fluid>
        <Row>
          {allProducts.map((item: any, index: number) => (
            <Col key={item.id} xl={3} lg={3} sm={6} md={6}>
              <Card className="m-2">
                <Card.Img variant="top" src={item.image_src[0]} />
                <Card.Body css={``}>
                  <b>{item.vendor}</b>
                  <p
                    css={`
                      font-weight: 300;
                      color: darkgrey;
                      font-size: 12px;
                    `}
                  >
                    {item.name}
                  </p>
                  <div
                    css={`
                      opacity: 0;
                      &:hover {
                        opacity: 1;
                      }
                    `}
                  >
                    {(badgeClicked[index]
                      ? !badgeClicked[index].clicked
                      : true) &&
                      item.options.map((option: any) => (
                        <Badge
                          onClick={e => badgeClick(option.value, index)}
                          css={`
                            margin: 0 5px 0 5px;
                            cursor: pointer;
                          `}
                          key={option.id}
                          variant="light"
                        >
                          {option.value}
                        </Badge>
                      ))}
                  </div>
                  {badgeClicked[index] && badgeClicked[index].clicked && (
                    <Button
                      onClick={e => addToCart(item, index)}
                      css={`
                        width: 100%;
                      `}
                      variant="outline-dark"
                      size="sm"
                    >
                      Add to Cart
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}

const Div = styled.div``

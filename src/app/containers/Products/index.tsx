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
import {
  Card,
  Col,
  Row,
  Container,
  Form,
  Badge,
  Button,
  Breadcrumb,
} from 'react-bootstrap'
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
  const [activeFilter, setActiveFilter] = React.useState<any>({})
  const [activeSort, setActiveSort] = React.useState<any>('lowToHigh')
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
  const getFilteredList = (item: any) => {
    if (item.value === 'allProducts') setAllProducts(products)
    else {
      let productsList = [...products]
      productsList = productsList.filter((data: any) => data.tag === item.value)
      setAllProducts(productsList)
    }
    setActiveFilter({
      [item.value]: activeFilter[item.value] ? !activeFilter[item.value] : true,
    })
  }
  const addToCart = (item: any, index: number) => {
    let values = { ...badgeClicked }
    values[index] = { ...values[index], clicked: false }
    setBadgeClick(values)
    dispatch(addItemsToCart({ item, variant: values[index].value }))
  }
  const sortList = (e: any) => {
    let productsList = [...allProducts]
    if (e.target.value === 'lowToHigh')
      productsList.sort(function (a: any, b: any) {
        return a.price - b.price
      })
    else if (e.target.value === 'highToLow')
      productsList.sort(function (a: any, b: any) {
        return b.price - a.price
      })
    setAllProducts(productsList)
    setActiveSort(e.target.value)
  }
  const filters = [
    {
      label: 'All Products',
      value: 'allProducts',
    },
    {
      label: 'Tee Shirt',
      value: 'T-shirt',
    },
    {
      label: 'Denim',
      value: 'Denim',
    },
    {
      label: 'Jackets',
      value: 'jacket',
    },
    {
      label: 'Shirt',
      value: 'shirt',
    },
  ]
  return (
    <>
      <Breadcrumb className="">
        <Breadcrumb.Item as="li">Home</Breadcrumb.Item>
        <Breadcrumb.Item as="li">Clothing</Breadcrumb.Item>
        <Breadcrumb.Item as="li">Mens Clothing</Breadcrumb.Item>
        <Breadcrumb.Item as="li" active>
          All Mens Clothing
        </Breadcrumb.Item>
      </Breadcrumb>
      <Container fluid>
        <h4>
          {' '}
          <b>All Products </b>({allProducts.length} Products)
        </h4>
        <h5 className="d-flex">
          {' '}
          <b className="align-self-center">Filters: </b>
          <div className="d-flex-inline ml-2 align-self-center">
            {filters.map((item: any) => (
              <Button
                active={activeFilter[item.value]}
                onClick={e => getFilteredList(item)}
                css={`
                  border-radius: 25px;
                `}
                variant="outline-secondary mr-1"
              >
                {item.label}
              </Button>
            ))}
          </div>
          <div className="ml-auto">
            <div
              css={`
                white-space: nowrap;
              `}
              className="d-flex align-items-center "
            >
              <span className="mr-2"> Sort:</span>
              <Form.Control
                value={activeSort}
                onChange={sortList}
                size="sm"
                as="select"
                custom
              >
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </Form.Control>
            </div>
          </div>
        </h5>

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
                  <div>
                    <div className="d-flex">
                      <h6>{item.price}$</h6>
                      <h6 className="ml-2">
                        <s> {item.compare_at_price}$</s>
                      </h6>
                      <small className="ml-2 text-success">
                        {Math.floor(
                          ((item.compare_at_price - item.price) /
                            item.compare_at_price) *
                            100,
                        ) + '%'}
                      </small>
                    </div>
                  </div>
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

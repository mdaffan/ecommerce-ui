/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { GlobalStyle } from 'styles/global-styles'

import { NotFoundPage } from './components/NotFoundPage/Loadable'
import { useTranslation } from 'react-i18next'
import Navbar from './components/NavBar'
import { Products } from './containers/Products'
import { useInjectReducer } from 'utils/redux-injectors'
import { reducer, sliceKey } from 'app/containers/Cart/slice'

import { useSelector } from 'react-redux'
import { selectCart } from './containers/Cart/selectors'
import { Cart } from './containers/Cart'
import Offers from './components/Offers'

export function App() {
  const { i18n } = useTranslation()
  useInjectReducer({ key: sliceKey, reducer: reducer })
  const { cartItems } = useSelector(selectCart)
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="E-Commerce"
        defaultTitle="E-Commerce"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Great place to shop" />
      </Helmet>
      <Navbar cartCount={cartItems.length} />
      <Offers />
      <Switch>
        <Route exact path="/" component={Products} />
        <Route exact path="/cart" component={Cart} />
        <Route component={NotFoundPage} />
      </Switch>

      <GlobalStyle />
    </BrowserRouter>
  )
}

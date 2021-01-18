import React, { useState } from 'react'
import { Navbar, Nav, NavDropdown, Badge } from 'react-bootstrap'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link, useHistory } from 'react-router-dom'
interface Props {
  cartCount: number
}
const NavBar: React.FC<Props> = props => {
  const location = useHistory()
  return (
    <Navbar bg="light" sticky="top" collapseOnSelect expand="lg">
      <Navbar.Brand href="#home">
        <img src="logo.png" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="m-auto">
          <NavDropdown title="Shop" id="collasible-nav-dropdown">
            <Link to="/">
              <NavDropdown.Item href="/">All Products</NavDropdown.Item>
            </Link>
          </NavDropdown>
          <Nav.Link href="#features">About Us</Nav.Link>
          <Nav.Link href="#pricing">Contact Us</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#deets">
            <AiOutlineShoppingCart />
          </Nav.Link>
          <div>
            <Nav.Link onClick={e => location.push('/cart')} eventKey={2}>
              <AiOutlineShoppingCart />
              <Badge>{props.cartCount}</Badge>
            </Nav.Link>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default NavBar

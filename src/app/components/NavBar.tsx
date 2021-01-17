import React, { useState } from 'react'
import { Navbar, Nav, NavDropdown, Badge } from 'react-bootstrap'
import { AiOutlineShoppingCart } from 'react-icons/ai'
interface Props {
  cartCount: number
}
const NavBar: React.FC<Props> = props => {
  return (
    <Navbar bg="light" sticky="top" collapseOnSelect expand="lg">
      <Navbar.Brand href="#home">
        <img src="logo.png" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="m-auto">
          <NavDropdown title="Shop" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Our Stores</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#features">About Us</Nav.Link>
          <Nav.Link href="#pricing">Contact Us</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#deets">
            <AiOutlineShoppingCart />
          </Nav.Link>
          <div>
            <Nav.Link eventKey={2} href="#memes">
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

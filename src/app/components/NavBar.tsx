import React from 'react'
import { Navbar, Nav, NavDropdown, Badge } from 'react-bootstrap'
import { IoIosCart } from 'react-icons/io'
import { GoPerson } from 'react-icons/go'
import { Link, useHistory } from 'react-router-dom'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled from 'styled-components/macro'
interface Props {
  cartCount: number
}
const NavBar: React.FC<Props> = props => {
  const location = useHistory()
  return (
    <>
      <Navbar
        style={{ boxShadow: '0 0 5px black' }}
        bg="light"
        sticky="top"
        collapseOnSelect
        expand="lg"
      >
        <Link to="/">
          <Navbar.Brand href="/">
            <img src="logo.png" alt="logo" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav "
          css={`
            text-align: center;
          `}
        >
          <Nav className="m-auto">
            <NavDropdown title="Shop" id="collasible-nav-dropdown">
              <Link to="/">
                <NavDropdown.Item href="/">All Products</NavDropdown.Item>
              </Link>
            </NavDropdown>
            <Nav.Link href="#aboutus">About Us</Nav.Link>
            <Nav.Link href="#stores">Our Stores</Nav.Link>
            <Nav.Link href="#contactus">Contact Us</Nav.Link>
          </Nav>
          <Nav
            css={`
              flex-direction: row;
              justify-content: center;
            `}
          >
            <Nav.Link>
              <GoPerson />
            </Nav.Link>
            <div>
              <Nav.Link onClick={e => location.push('/cart')} eventKey={2}>
                <IoIosCart />
                <Badge>{props.cartCount}</Badge>
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
export default NavBar

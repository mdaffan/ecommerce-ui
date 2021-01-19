import React from 'react'
import { Button } from 'react-bootstrap'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled from 'styled-components/macro'
import Typography from './Typography'
const Offers = () => {
  return (
    <div
      css={`
        background: linear-gradient(to right, #331e14 0%, #ea4e22 100%);
        text-align: center;
        justify-content: center;
        padding: 10px 0 5px 0;
        display: flex;
      `}
    >
      <Typography
        css={`
          align-self: center;
          margin-bottom: 0;
        `}
        fontSize="1.2rem"
        color="white"
      >
        Invite Friends to Big Fashion Festival & Get up to $150 MynCash For
        Every Person Who Visists
      </Typography>
      <Button
        css={`
          border-radius: 25px;
          margin-left: 5px;
        `}
        variant="light"
      >
        Invite Now
      </Button>
    </div>
  )
}

export default Offers

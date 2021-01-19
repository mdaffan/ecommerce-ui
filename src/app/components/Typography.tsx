import React from 'react'
import styled, { css } from 'styled-components/macro'
import {
  space,
  color,
  border,
  typography,
  SpaceProps,
  ColorProps,
  BorderProps,
  TypographyProps,
} from 'styled-system'

type CssProps = SpaceProps &
  ColorProps &
  BorderProps &
  TypographyProps &
  TypoOwnProps

const StyledTag = styled.p<CssProps>`
  ${space}
  ${color}
  ${border}
  ${typography}
  ${props =>
    props.hover &&
    css`
      &:hover {
        color: #42c1e8;
        cursor: pointer;
      }
    `}
  ${props =>
    props.type === 'title' &&
    css`
      font-weight: 500;
      font-size: 16px;
      color: #000000;
    `}
  }

`

interface TypoOwnProps {
  children: any
  style?: React.CSSProperties
  as?: any
  hover?: boolean
  type?: string
  className?: string
  onClick?(e: MouseEvent): void
}

const defaultProps: TypoOwnProps = {
  as: 'p',
  children: '',
}

const Typography: React.FC<TypoOwnProps & CssProps> = ({
  as,
  children,
  className,
  ...props
}) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledTag as={as} className={className} {...props}>
      {children}
    </StyledTag>
  )
}

Typography.defaultProps = defaultProps
export default Typography

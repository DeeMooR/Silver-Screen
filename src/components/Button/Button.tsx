import React, { FC, ReactNode } from 'react'
import './Button.css'

interface IButton {
    children: ReactNode,
    color: 'red' | 'white',
    handleClick?: () => void,
}

const Button:FC<IButton> = ({children, color, handleClick}) => {
  return (
    <button type='button' className={`custom-button border-${color}`} onClick={handleClick}>{children}</button>
  )
}

export default Button

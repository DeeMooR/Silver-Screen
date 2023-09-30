import React, { FC, ReactNode } from 'react'
import './Button.css'

interface IButton {
    children: ReactNode,
    color: 'red' | 'white',
}

const Button:FC<IButton> = ({children, color}) => {
  return (
    <button type='button' className={`custom-button border-${color}`}>{children}</button>
  )
}

export default Button

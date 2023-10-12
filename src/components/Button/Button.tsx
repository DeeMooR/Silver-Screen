import React, { FC, ReactNode } from 'react'
import './Button.css'

interface IButton {
    children: ReactNode,
    color: 'red' | 'white',
    handleClick?: () => void,
    isMin?: boolean
}

const Button:FC<IButton> = ({children, color, handleClick, isMin}) => {
  return (
        <button
            type="button"
            className={`
                custom-button 
                border-${color} 
                ${isMin ? "height-min" : ""}
            `}
            onClick={handleClick}
        >
            {children}
        </button>
  );
}

export default Button

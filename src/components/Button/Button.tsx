import React, { FC, ReactNode } from 'react'
import './Button.css'

interface IButton {
    children: ReactNode,
    color: 'red' | 'white',
    handleClick?: () => void,
    isMin?: boolean,
    becomeSmall?: boolean
}

const Button:FC<IButton> = ({children, color, handleClick, isMin, becomeSmall}) => {
  return (
        <button
            type="button"
            className={`
                custom-button 
                border-${color} 
                ${isMin ? "height-min" : ""}
                ${becomeSmall ? "become-small" : ""}
            `}
            onClick={handleClick}
        >
            {children}
        </button>
  );
}

export default Button

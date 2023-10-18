import React, { FC, ReactNode } from 'react'
import './ButtonForm.css'

interface IButtonForm {
    children: ReactNode,
    handleClick?: () => void,
    size?: 'back' | 'withBack'
}

const ButtonForm:FC<IButtonForm> = ({children, handleClick, size}) => {
    return (
        <button
            type="button"
            className={`buttonForm ${size ? size : ''}`} 
            onClick={handleClick}
        >
            {children}
        </button>
    );
}

export default ButtonForm

import React, { FC } from 'react'
import { Link } from 'react-router-dom';
import { StyledLogoBig, BackgroundSlideBar } from './../styled'
import "./SlideBar.css"

import logoBig from "src/icons/logo_big.png"
import logoBig_pink from "src/icons/logo_big_pink.png"

import background from "src/icons/slide_bar.svg"
import cross from "src/icons/cross.png"
import search from "src/icons/search.png"
import account from "src/icons/account.png"

interface ISlideBar {
    clickMenu: boolean,
    setClickMenu: (value: boolean) => void,
}

const SlideBar:FC<ISlideBar> = ({ clickMenu, setClickMenu }) => {

    const handleClick = () => {
        setClickMenu(false);
    }

    return (
        <BackgroundSlideBar image={background} className={`slideBar ${clickMenu && 'show'}`} >
            <div className="slideBar__logo" onClick={handleClick}>
                <StyledLogoBig logo={logoBig} logo_pink={logoBig_pink} />
            </div>
            <Link to='/' className="slideBar__item" onClick={handleClick}>Главная</Link>
            <Link to='/afisha' className="slideBar__item" onClick={handleClick}>Афиша</Link>
            <Link to='/afisha/0' className="slideBar__item" onClick={handleClick}>Новости</Link>
            <Link to='/afisha' className="slideBar__item" onClick={handleClick}>Акции</Link>
            <div className="slideBar__icons">
                <img src={search} alt="search" className='slideBar__search' onClick={handleClick} />
                <img src={account} alt="account" className='slideBar__account' onClick={handleClick} />
            </div>
            <img src={cross} className='slideBar__cross' onClick={() => setClickMenu(false)} alt="cross"  />
        </BackgroundSlideBar>
    )
}

export default SlideBar
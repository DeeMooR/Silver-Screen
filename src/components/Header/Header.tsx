import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SlideBar from './SlideBar'
import { StyledLogoSmall, StyledLogoBig } from './styled'
import './Header.css'

import logoBig from "src/icons/logo_big.png"
import logoBig_pink from "src/icons/logo_big_pink.png"
import logoSmall from "src/icons/logo_small.png"
import logoSmall_pink from "src/icons/logo_small_pink.png"

import menu from "src/icons/menu.png"
import search from "src/icons/search.png"
import account from "src/icons/account.png"

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [clickMenu, setClickMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) setIsScrolled(true);
            else setIsScrolled(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (clickMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [clickMenu]);

    return (
        <>
        <header className={`header ${isScrolled ? 'scrollHeader' : ''}`}>
            <div className="header__wrapper">
                <div className="header__content">
                    <img src={menu} alt="menu" className='header__menu' onClick={() => setClickMenu(true)} />
                    <div className="header__logo">
                        {isScrolled
                            ? <StyledLogoSmall logo={logoSmall} logo_pink={logoSmall_pink} />
                            : <StyledLogoBig logo={logoBig} logo_pink={logoBig_pink} />
                        }
                    </div>
                    <nav className='header__nav'>
                        <Link to='/afisha/0'>Главная</Link>
                        <Link to='/afisha'>Афиша</Link>
                        <Link to='/afisha'>Новости</Link>
                        <Link to='/afisha'>Акции</Link>
                    </nav>
                    <div className="header__icons">
                        <img src={search} alt="search" />
                        <img src={account} alt="account" />
                    </div>
                </div>
            </div>
        </header>
            <SlideBar clickMenu={clickMenu} setClickMenu={setClickMenu} />
        </>
    )
}

export default Header

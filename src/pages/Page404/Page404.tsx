import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import { BackgroundImage } from './styled'
import './Page404.css'

const Page404 = () => {
    const navigate = useNavigate();
    const bg_image = "https://i.ibb.co/52nM9bx/page-404.jpg";

    return (
        <div className='page404'>
            <BackgroundImage image={bg_image} />
            <div className="page404__wrapper">
                <div className="page404__content">
                    <p className='page404__title'>Cтраница не была загружена, повторите попытку позже</p>
                    <p className='page404__quote'>Гнев, страх, агрессия! Это Тёмная сторона Силы. Легко приходят, но тяжела цена за мощь, которую они дают</p>
                    <p className='page404__film'>Звездные войны: Эпизод 3 — Месть Ситхов</p>
                    <Button color='red' handleClick={() => navigate('/')}>Перейти на главную</Button>
                </div>
            </div>
        </div>
    )
}

export default Page404

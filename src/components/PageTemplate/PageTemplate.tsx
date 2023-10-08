import React, { FC, ReactNode } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import './PageTemplate.css'

interface IPageTemplate {
    children: ReactNode,
}

const PageTemplate:FC<IPageTemplate> = ({children}) => {
    return (
        <div className='pageTemplate'>
            <Header />
            <div className="pageTemplate__wrapper">
                <main>{children}</main>
                <Footer />
            </div>
        </div>
    )
}

export default PageTemplate

import React, { FC, ReactNode } from 'react'
import Footer from '../Footer'
import './PageTemplate.css'

interface IPageTemplate {
    children: ReactNode,
}

const PageTemplate:FC<IPageTemplate> = ({children}) => {
    return (
        <div className='pageTemplate'>
            <header>Header</header>
            <main>{children}</main>
            <Footer />
        </div>
    )
}

export default PageTemplate

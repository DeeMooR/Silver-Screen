import React from 'react'
import PageTemplate from 'src/components/PageTemplate'
import SlideInfo from 'src/components/SlideInfo'

import { arrNewsPageNews } from 'src/helpers'
import './NewsPage.css'
import HorizontalNews from 'src/components/HorizontalNews'
import { INews } from 'src/interfaces'

const NewsPage = () => {
    window.scrollTo({top: 0});
    return (
        <PageTemplate>
            <div className='newsPage'>
                <h1 className='newsPage__title'>Новости</h1>
                {arrNewsPageNews.map((item: INews, index: number) => (
                    <div className="news__item" key={index}>
                        {index % 2 === 0
                        ? <HorizontalNews obj={item} page='main' />
                        : <HorizontalNews obj={item} page='main' reverse />
                        }
                    </div>
                ))}
            </div>
        </PageTemplate>
    )
}

export default NewsPage

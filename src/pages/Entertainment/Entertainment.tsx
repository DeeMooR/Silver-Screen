import React from 'react'
import PageTemplate from 'src/components/PageTemplate'
import SlideInfo from 'src/components/SlideInfo'

import { arrEntertainmentNews, mainEntertainment } from 'src/helpers'
import { INews } from 'src/interfaces'
import HorizontalNews from 'src/components/HorizontalNews'
import './Entertainment.css'

const Entertainment = () => {
    window.scrollTo({top: 0});
    return (
        <PageTemplate>
            <div className='entertainment'>
                <div className="entertainment__main">
                    <SlideInfo slide={mainEntertainment} reverse />
                </div>
                <div className="entertainment__content">
                    {arrEntertainmentNews.map((item: INews, index: number) => (
                        <div className="news__item" key={index}>
                            {index % 2 === 0
                            ? <HorizontalNews obj={item} page='other' />
                            : <HorizontalNews obj={item} page='other' reverse />
                            }
                        </div>
                    ))}
                </div>
            </div>
        </PageTemplate>
    )
}

export default Entertainment

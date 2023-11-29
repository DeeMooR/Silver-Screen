import React, {useEffect, useState} from 'react'
import PageTemplate from 'src/components/PageTemplate'

import './NewsPage.css'
import HorizontalNews from 'src/components/HorizontalNews'
import { INews, IPageTitle } from 'src/interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { GET_NEWSPAGE_NEWS, GET_PAGE_TITLES } from 'src/actions/actions'
import SlideInfo from 'src/components/SlideInfo'

const NewsPage = () => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const arrNewsPageNews: INews[] = useSelector(({storePages}) => storePages.newsPageNews);
    const isLoadingPage = useSelector(({store}) => store.isLoadingPage);
    const [modal, setModal] = useState(<div/>);
    
    const arrPageTitle = useSelector(({store}) => store.pageTitles);
    const pageTitle = arrPageTitle.find((item: IPageTitle) => item.page === "news");

    useEffect(() => {
        window.scrollTo({top: 0});
        const fetchData = async () => {
            dispatch({ type: "SET_LOADING_PAGE" });
            if (!arrNewsPageNews.length) await dispatch(GET_NEWSPAGE_NEWS(setModal));
            if (!arrPageTitle.length) await dispatch(GET_PAGE_TITLES(setModal));
            dispatch({ type: "SET_LOADING_PAGE" });
        };
        fetchData();
    },[])

    return (
        <>
        {modal}
        {isLoadingPage || !pageTitle ? (
            <div className="loaderPage">
                <div className="loaderPage__element"></div>
            </div>
        ) : (
            <PageTemplate>
                <div className='newsPage'>
                    <div className="newsPage__main">
                        <SlideInfo slide={pageTitle} reverse />
                    </div>
                    <div className="newsPage__content">
                        {arrNewsPageNews.map((item: INews, index: number) => (
                            <div className="news__item" key={index}>
                                {index % 2 === 0
                                ? <HorizontalNews obj={item} page='main' />
                                : <HorizontalNews obj={item} page='main' reverse />
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </PageTemplate>
        )}
        </>
    )
}

export default NewsPage

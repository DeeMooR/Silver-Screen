import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import HorizontalNews from 'src/components/HorizontalNews'
import SlideInfo from 'src/components/SlideInfo'
import PageTemplate from 'src/components/PageTemplate'
import { GET_NEWS, GET_PAGE_TITLES } from 'src/actions/actions'
import { INews, IPageTitle } from 'src/interfaces'
import './NewsPage.css'

const NewsPage = () => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const isLoadingPage = useSelector(({store}) => store.isLoadingPage);
    const [modal, setModal] = useState(<div/>);
    
    const arrPageTitle = useSelector(({storePages}) => storePages.pageTitles);
    const arrNews = useSelector(({storePages}) => storePages.news);
    const pageTitle = arrPageTitle.find((item: IPageTitle) => item.page === "news");
    const pageNews = arrNews.filter((item: INews) => item.page === "news");

    useEffect(() => {
        window.scrollTo({top: 0});
        const fetchData = async () => {
            dispatch({ type: "SET_LOADING_PAGE" });
            if (!arrNews.length) await dispatch(GET_NEWS(setModal));
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
                        {pageNews.map((item: INews, index: number) => (
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

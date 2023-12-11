import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Link } from 'react-router-dom'
import { AnyAction } from 'redux'
import PageTemplate from 'src/components/PageTemplate'
import MovieCard from 'src/components/MovieCard'
import NotFind from 'src/components/NotFind'
import Navigation from 'src/components/Navigation'
import TitleWithSwitch from 'src/components/TitleWithSwitch'
import HorizontalNews from 'src/components/HorizontalNews'
import { getArrDate, getArrMoviesShow, getArrSoonDatesWithWeek, setDateStore } from 'src/helpers'
import { filterMoviesInAfisha } from 'src/filterMovies'
import { GET_MOVIES, GET_NEWS, GET_SEANCES_ONE_MOVIE } from 'src/actions/actions'
import { IMovie, INews } from 'src/interfaces'
import './Afisha.css'

const Afisha = () => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const arrMovies: IMovie[] = useSelector(({storePages}) => storePages.movies);
    const arrNews = useSelector(({storePages}) => storePages.news);
    const movieTypeSelect: string = useSelector(({store}) => store.movieTypeSelect);
    const isLoading = useSelector(({store}) => store.isLoading);
    const isLoadingPage = useSelector(({store}) => store.isLoadingPage);

    // получение параметров фильтрации
    const fullSearchDate = useSelector(({store}) => store.search.date);
    const searchVideo = useSelector(({store}) => store.search.video);
    const searchAudio = useSelector(({store}) => store.search.audio);
    let searchLanguage = useSelector(({store}) => store.search.language);

    const [modal, setModal] = useState(<div/>);
    const [activePage, setActivePage] = useState(0);
    const searchDate = fullSearchDate.split(', ')[1];
    const pageNews = arrNews.filter((item: INews) => item.page === "afisha");

    // фильтрация фильмов 'Сейчас' или 'Скоро в кино' и по параметрам
    const arrMoviesShow = getArrMoviesShow(arrMovies, movieTypeSelect);
    const filteredMovies = filterMoviesInAfisha(arrMoviesShow, searchDate, searchVideo, searchAudio, searchLanguage);

    // получуние нужных данных
    useEffect(() => {
        dispatch({ type: "SET_ID_ACTIVE_MOVIE_PAGE", payload: null });
        window.scrollTo({top: 0});
        if (movieTypeSelect === 'already') setActivePage(1);
        else setActivePage(2);

        const fetchData = async () => {
            await dispatch({ type: "SET_LOADING_PAGE" });
            if (!arrMovies.length) await dispatch(GET_MOVIES(setModal));
            await arrMovies.forEach(movie => {
                dispatch(GET_SEANCES_ONE_MOVIE(movie.id, setModal));
            })
            await dispatch({ type: "SET_LOADING_PAGE" });

            if (!arrNews.length) {
                await dispatch({ type: "SET_LOADING" });
                await dispatch(GET_NEWS(setModal));
                dispatch({ type: "SET_LOADING" });
            }
        };
        fetchData();
    },[])

    // переключение между 'Сейчас' или 'Скоро в кино'
    useEffect(() => {
        if (movieTypeSelect === 'already' && getArrSoonDatesWithWeek().includes(fullSearchDate)) {
            setDateStore(getArrDate()[0], dispatch)
            setActivePage(1);
        }
        if (movieTypeSelect === 'soon' && getArrDate().includes(fullSearchDate)) {
            setDateStore(getArrSoonDatesWithWeek()[0], dispatch)
            setActivePage(2);
        }
    },[movieTypeSelect])
    
    return (
        <>
        {modal}
        {isLoadingPage || !filteredMovies.length ? (
            <div className="loaderPage">
                <div className="loaderPage__element"></div>
            </div>
        ) : (
            <PageTemplate>
                <div className='afisha'>
                    <div className="afisha__wrapper">
                        <TitleWithSwitch title='Афиша кино' switch_1='Сейчас в кино' switch_2='Скоро' active={activePage} setActive={setActivePage} />
                        <div className='afisha__navigation'>
                            <Navigation />
                        </div>
                        <div className='afisha__cards'>
                            {filteredMovies.map((card: IMovie, i: number) => (
                                <div className="cards__item" key={i}>
                                    <MovieCard obj={card} page='afisha' />
                                </div>
                            ))}
                            <div className={`cards__item
                                ${filteredMovies.length % 4 === 0 && "center-4"}
                                ${filteredMovies.length % 3 === 0 && "center-3"}
                                ${filteredMovies.length % 2 === 0 && "center-2"}
                            `}>
                                <NotFind page='afisha' />
                            </div>
                        </div>
                        <div className="afisha__text">
                            <p>Кинопространства mooon и Silver Screen представляет Вам киноафишу всех фильмов, идущих в нашей <Link to='/'>сети кинотеатров</Link>.</p>
                            <p>Наша киноафиша познакомит Вас с премьерами мировой киноиндустрии, расскажет о новинках кино для детей и взрослых и пригласит на показ любимых ретроспективных картин. Предлагаем Вам насладиться лучшими моментами вышедших в прокат фильмов, ознакомиться с трейлерами и полной информацией о кинолентах: продолжительности, рейтинге, создателях, актерском составе.</p>
                            <p>Мы предлагаем Вам ознакомиться с киноафишей на нашем сайте, посмотреть, что идет в кино в Минске и в Гродно сегодня и купить билеты онлайн в кинотеатры Silver Screen и mooon, не выходя из дома.</p>
                            <p>Доставьте себе удовольствие от просмотра своих любимых фильмов! Ждем Вас у нас в кинопространствах mooon и Silver Screen!</p>
                        </div>
                    </div>
                    {isLoading ? (
                        <div className="loader">
                            <div className="loader__element"></div>
                        </div>
                    ) : (
                        <HorizontalNews obj={pageNews[0]} page='main' reverse />
                    )}
                </div>
            </PageTemplate>
        )}
        </>
    );
}

export default Afisha

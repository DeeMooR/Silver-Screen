import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Link } from 'react-router-dom';
import { AnyAction } from 'redux';
import AccountBuyCard from './AccountBuyCard/AccountBuyCard';
import AccountBuyTicket from './AccountBuyTicket';
import { GET_GIFT_CARDS, GET_MOVIES, GET_MY_CARDS_MOVIES, GET_ROOMS, GET_SEANCES_ONE_MOVIE } from 'src/actions/actions';
import { ICard, IDataMyCard, IDataMyMovie, IMovie, IRoom } from 'src/interfaces'
import './AccountBuy.css'


const AccountBuy = () => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const arrMovies: IMovie[] = useSelector(({storePages}) => storePages.movies);
    const arrGiftCards: ICard[] = useSelector(({storePages}) => storePages.cards);
    const arrRooms: IRoom[] = useSelector(({storePages}) => storePages.rooms);
    const userId = useSelector(({storeUser}) => storeUser.user.id);
    const isLoading = useSelector(({store}) => store.isLoading);

    const arrMyCards: IDataMyCard[] = useSelector(({storeUser}) => storeUser.my_card);
    const arrMyMovies: IDataMyMovie[] = useSelector(({storeUser}) => storeUser.my_movie);
    const [modal, setModal] = useState(<div/>);

    useEffect(() => {
        window.scrollTo({ top: 0 });
        const fetchData = async () => {
            dispatch({ type: "SET_LOADING" });
            if (!arrMovies.length) await dispatch(GET_MOVIES(setModal));
            if (!arrGiftCards.length) await dispatch(GET_GIFT_CARDS(setModal));
            if (!arrRooms.length) await dispatch(GET_ROOMS(setModal));
            if (!arrMyCards.length || !arrMyMovies.length) await dispatch(GET_MY_CARDS_MOVIES(userId, setModal));
            dispatch({ type: "SET_LOADING" });
        };
        fetchData();
    },[])

    // отобразить фильмы в обратном порядке
    useEffect(() => {
        arrMyMovies.reverse();
        arrMyMovies.forEach(my_movie => {
            // получаем данные о сеансах куленных фильмов
            const movie_id = my_movie.movie_id;
            const date = my_movie.date;
            const findMovie = arrMovies.find(movie => movie.id === movie_id);
            const findShedule = findMovie?.schedule.find(item => item.date === date);
            if (findShedule?.seances.length === 0) {
                dispatch(GET_SEANCES_ONE_MOVIE(movie_id, setModal));
            }
        })
    },[arrMyMovies])

    // отобразить карты в обратном порядке
    useEffect(() => {
        arrMyCards.reverse();
    },[arrMyCards])
    
    return (
        <>
        {modal}
        <div className='accountBuy'>
            <div className="accountBuy__title">Билеты</div>
            {isLoading ? (
                <div className="loader">
                    <div className="loader__element"></div>
                </div>
            ) : (
                <>
                <p className='accountBuy__address'>Silver Screen в ТРЦ Arena city г. Минск, пр Победителей, 84</p>
                {arrMyMovies.length ? (
                    <div className="accountBuy__items">
                        {arrMyMovies.map((item, i) => (
                            <AccountBuyTicket obj={item} key={i} />
                        ))}
                    </div>
                ) : (
                    <p className='accountBuy__empty'>Пусто. Купить билет на фильм можно <Link to='/afisha'>здесь</Link>.</p>
                )}
                <div className="accountBuy__title">Подарочные карты</div>
                {arrMyCards.length ? (
                    <div className="accountBuy__items">
                        {arrMyCards.map((item) => (
                            <AccountBuyCard obj={item} key={item.number_card} />
                        ))}
                    </div>
                ) : (
                    <p className='accountBuy__empty'>Пусто. Приобрести подарочную карту можно <Link to='/presentcard'>здесь</Link>.</p>
                )}
                </>
            )}
        </div>
        </>
    )
}

export default AccountBuy

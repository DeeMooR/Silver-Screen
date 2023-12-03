import React, { FC, useEffect, useState } from 'react'
import './AccountBuy.css'
import { ICard, IDataMyCard, IDataMyMovie, IDataSeatSelect, IMovie, ISeance } from 'src/interfaces'
import { GET_GIFT_CARDS, GET_MOVIES, GET_MY_CARDS_MOVIES, GET_SEANCES_ONE_MOVIE } from 'src/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import AccountBuyCard from './AccountBuyCard/AccountBuyCard';
import { Link } from 'react-router-dom';
import AccountBuyTicket from './AccountBuyTicket';


const AccountBuy = () => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const arrGiftCards: ICard[] = useSelector(({store}) => store.card);
    const arrMyCards: IDataMyCard[] = useSelector(({store}) => store.my_card);
    const arrMyMovies: IDataMyMovie[] = useSelector(({store}) => store.myMovie);
    const userId = useSelector(({store}) => store.user.id);
    const isLoading = useSelector(({store}) => store.isLoading);
    const [modal, setModal] = useState(<div/>);

    const arrMovies: IMovie[] = useSelector(({storePages}) => storePages.arrMovies);

    useEffect(() => {
        const fetchData = async () => {
            window.scrollTo({ top: 0 });
            dispatch({ type: "SET_LOADING" });
            if (!arrMovies.length) await dispatch(GET_MOVIES(setModal));
            if (!arrMyCards.length) await dispatch(GET_MY_CARDS_MOVIES(userId, setModal));
            if (!arrGiftCards.length) await dispatch(GET_GIFT_CARDS(setModal));
            dispatch({ type: "SET_LOADING" });
        };
        fetchData();
    },[])

    useEffect(() => {
        arrMyMovies.reverse();
        arrMyMovies.forEach(my_movie => {
            const movie_id = my_movie.movie_id;
            const date = my_movie.date;
            const findMovie = arrMovies.find(movie => movie.id === movie_id);
            const findShedule = findMovie?.schedule.find(item => item.date === date);
            if (findShedule?.seances.length === 0) {
                dispatch(GET_SEANCES_ONE_MOVIE(movie_id, setModal));
            }
        })
    },[arrMyMovies])
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

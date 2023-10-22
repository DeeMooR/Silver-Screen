import React, { useEffect, useState } from 'react'
import './BuyTicketPage.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IMovie, IRoom, IRow, ISeatType } from 'src/interfaces';
import { addDayOfWeek, formateDateItem, getAudio, getTimePlusDuration } from 'src/helpers';
import PageMovieTemplate from 'src/components/PageMovieTemplate';
import ModalAge18 from 'src/components/ModalAge18';

import location from "src/icons/location.png"
import calendar from "src/icons/calendar.png"
import video from "src/icons/video.png"
import screen from "src/icons/screen.png"
import RowSeats from 'src/components/RowSeats';
import SeatTypeInfo from 'src/components/SeatTypeInfo';
import Button from 'src/components/Button';
import { GET_MOVIES, GET_ROOMS, GET_SEAT_TYPES } from 'src/actions/actions';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const BuyTicketPage = () => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const navigate = useNavigate();
    const {id = '', date, room, time} = useParams<{id: string, date: string, room: string, time: string}>();
    const arrMovies: IMovie[] = useSelector(({storePages}) => storePages.arrMovies);
    const movie = arrMovies[+id] || null;
    const isLoading = useSelector(({store}) => store.isLoading);
    const isLoadingPage = useSelector(({store}) => store.isLoadingPage);
    const arrRooms: IRoom[] = useSelector(({storePages}) => storePages.arrRooms);
    const arrSeatTypes: ISeatType[] = useSelector(({storePages}) => storePages.seatTypes);
    let exampleImage;
    if (arrSeatTypes.length) exampleImage = arrSeatTypes[0].image;
    const [modal, setModal] = useState(<div/>);
    
    const token = localStorage.getItem('access');
    const newId = id || '';
    const newDate = date || '';
    const newRoom = room || '';
    const newTime = time || '';

    const [modalIsOpen, setModalIsOpen] = useState(false);
   
    const objDate = movie?.schedule.find((item) => item.date === date);
    const objSeance = objDate?.seances.find((item) => item.room === +newRoom && item.time === time);
    const objRoom = arrRooms.find((item) => item.room === +newRoom);       // объект room: room, costSingle, costSofa, rows

    const arrRoomSeatTypes = objRoom?.rows
        .reduce((types: { type: string; cost: number }[], item: IRow) => {
            console.log(types);
            if (!types.some((typesItem) => typesItem.type === item.type)) {
                if (item.type === "single") types.push({ type: "single", cost: objRoom?.costSingle });
                if (item.type === "sofa") types.push({ type: "sofa", cost: objRoom?.costSofa });
            }
            return types;
        }, [])
        .sort((a, b) => a.cost - b.cost);

    const fullURL = window.location.href;
    const movieURL = '/afisha' + fullURL.split('buy-ticket')[1].split('/').slice(0, 2).join('/');

    const clickSignIn = () => {
        const fullURL = window.location.href
        const url = fullURL.split('3000')[1];
        navigate('/sign-in', {state: {fromPage: url}});
    }

    
    useEffect(() => {
        window.scrollTo({top: 0});
        const fetchData = async () => {
            if (!arrMovies.length) {
                await dispatch({ type: "SET_LOADING_PAGE" });
                await dispatch(GET_MOVIES(setModal));
                if (!arrRooms.length) await dispatch(GET_ROOMS(setModal));
                if (!arrSeatTypes.length) await dispatch(GET_SEAT_TYPES(setModal));
                dispatch({ type: "SET_LOADING_PAGE" });
            } else {
                dispatch({ type: "SET_LOADING" });
                if (!arrRooms.length) await dispatch(GET_ROOMS(setModal));
                if (!arrSeatTypes.length) await dispatch(GET_SEAT_TYPES(setModal));
                dispatch({ type: "SET_LOADING" });
            }
        };
        fetchData();
    },[])

    return (
        <>
        {modal}
        {(isLoadingPage || !arrMovies.length) ? (
            <div className="loaderPage">
                <div className="loaderPage__element"></div>
            </div>
        ) : (
            <PageMovieTemplate movie={movie} customBack={movieURL}>
                <div className='buyTicketPage'>
                    <div className="buyTicketPage__header">
                        <img src={movie.image} className='buyTicketPage__image' alt="poster" />
                        <div className="buyTicketPage-header__right">
                            <p className='buyTicketPage-header__title'>{movie.title}</p>
                            <div className='buyTicketPage-header__info'>
                                <div className="flex__icon-text">
                                    <img src={location} alt="location" />
                                    <p>Silver Screen в ТРЦ Arena city г. Минск, пр Победителей, 84 / Зал {room}</p>
                                </div>
                                <div className="flex__icon-text">
                                    <img src={calendar} alt="calendar" />
                                    <p>{formateDateItem(addDayOfWeek(newDate))} / {time} - {getTimePlusDuration(newTime, movie.duration)} </p>
                                </div>
                                <div className="flex__icon-text">
                                    <img src={video} alt="video" />
                                    <p>{movie.video} / {getAudio(+newRoom)} </p>
                                </div>
                                <div className="buyTicketPage-header__age">{movie.age}+</div>
                            </div>
                        </div>
                    </div>
                    {isLoading ? (
                        <div className="loader">
                            <div className="loader__element"></div>
                        </div>
                    ) : (
                        <div className="buyTicketPage__table">
                            <div className="buyTicketPage__hall">
                                <img src={screen} className='buyTicketPage__screen' alt="screen" />
                                <div className="buyTicketPage__seats">
                                    {objSeance?.places?.map((row: number[], i: number) => (
                                        <RowSeats arrRow={row} room={+newRoom} indexRow={i} key={i} />
                                    ))}
                                </div>
                                <div className='buyTicketPage__example'>
                                    <div className="buyTicketPage-example__img-span">
                                        <img src={exampleImage} className='empty' alt="seat" />
                                        <span>Свободно</span>
                                    </div>
                                    <div className="buyTicketPage-example__img-span">
                                        <img src={exampleImage} alt="seat" />
                                        <span>Занято</span>
                                    </div>
                                </div>
                                <p className='buyTicketPage__text'>Продажа билетов онлайн прекращается за 10 минут до начала сеанса, далее билеты можно приобрести в кассах кинотеатра.</p>
                                <ul className='buyTicketPage__list'>
                                    <li className='buyTicketPage__item'><span>1.</span><p>Детский билет — для зрителей до 10 лет включительно на киносеансы фильмов возрасной категории «0+» и «6+». Чтобы купить детский билет на сайте, после выбора места в кинозале на сеанс определенного фильма просто измените категорию билета со Стандартный на Детский.<br/>Дети в возрасте до 5 лет включительно могут посетить киносеанс показа фильма, имеющего возрастную категорию «0+» бесплатно, при условии, что во время сеанса ребёнок не занимает отдельное место и находится на руках у взрослого. <Link to='/page404'>Подробнее.</Link></p></li>
                                    <ol className='buyTicketPage__item'><span>2.</span><p>Семейный билет – для семьи от 3х человек и более с минимум одним ребенком до 16 лет включительно, при единовременном посещении Киносеанса; доступен для покупки только в кассах Кинотеатра; возрастные ограничения на просмотр фильма: «0+», «6+» и «12+». <Link to='/page404'>Подробнее.</Link></p></ol>
                                    <ol className='buyTicketPage__item'><span>3.</span><p>Скидка Red Carpet Club не предоставляется при покупке билетов на киносеансы на места повышенной комфортности.</p></ol>
                                    <ol className='buyTicketPage__item'><span>4.</span><p>Скидка Red Carpet Club предоставляется при приобретении не более 4 (четырех) билетов на 1 сеанс. Дополнительное количество билетов сверх четырех реализуется по цене без предоставления скидки.</p></ol>
                                </ul>
                            </div>
                            <div className="buyTicketPage__basket">
                                <p className='buyTicketPage-basket__title'>Типы мест</p>
                                <p className='buyTicketPage-basket__location'>Silver Screen в ТРЦ Arena city</p>
                                <div className="buyTicketPage-basket__types">
                                    {arrRoomSeatTypes?.map((item, i: number) => (
                                        <SeatTypeInfo typeAndCost={item} key={i} />
                                    ))}
                                </div>
                                <div className="buyTicketPage-basket__text">Скидки Red Carpet Club будут рассчитаны после выбора мест.<br/>Покупая билет(-ы), вы автоматически соглашаетесь с <Link to='/page404'>Правилами посещения кинотеатров</Link>.</div>
                                <div className="buyTicketPage-basket__button no-active">
                                    {token 
                                    ? <Button color='grey' className='no-active' fill >Выберите места</Button>
                                    : <Button color='red' fill handleClick={clickSignIn}>Войти в аккаунт</Button>
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {movie.age >= 18 &&
                    <ModalAge18 isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
                }
            </PageMovieTemplate>
        )}
        </>
    )
}

export default BuyTicketPage

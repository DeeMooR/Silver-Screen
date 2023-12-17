import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { compareTimeNowStart, getAudio, getDatePoints, getTimePlusDuration, getTodayDate } from 'src/helpers/helper'
import { IDataMyMovie, IMovie, IRoom } from 'src/interfaces'
import './AccountBuyTicket.css'

interface IAccountBuyTicket {
    obj: IDataMyMovie
}

const AccountBuyTicket:FC<IAccountBuyTicket> = ({obj}) => {
    const arrMovies: IMovie[] = useSelector(({storePages}) => storePages.movies);
    const arrRooms: IRoom[] = useSelector(({storePages}) => storePages.rooms);

    // получаем данные о фильме для отображения
    const movie = arrMovies.find((item) => item.id === obj.movie_id);
    const shedule = movie?.schedule.find(item => item.date === obj.date);
    const objSeance = shedule?.seances.find((item) => item.id === obj.seance_id);
    const room = arrRooms.find(room => room.id === objSeance?.room_id);

    // получаем стоимость билета
    const getCost = (seat_type: String) => {
        return (seat_type === 'single') ? (room?.cost_single || 0) : (room?.cost_sofa || 0);
    }

    // фильм уже начался?
    const alreadyStart = (objSeance && getDatePoints(getTodayDate()) === obj.date) ? compareTimeNowStart(objSeance?.time) : false;

    return (
        <>
        {movie && objSeance &&
            <div className='accountBuyTicket'>
                <img src={movie?.image} className='accountBuyTicket__image' alt="movie" />
                <div className="accountBuyTicket__info">
                    <p className='accountBuyTicket__title'>{movie.title}</p>
                    <div className="accountBuyTicket__text">
                        <div className="accountBuyTicket__left">
                            <p className={`accountBuyTicket__date-time ${alreadyStart ? 'alreadyStart' : ''}`}>
                                {obj.date} / {objSeance.time} - {getTimePlusDuration(objSeance.time, movie.duration)}
                            </p>
                            <p className='accountBuyTicket__other'>
                                <span>{movie.language}{movie.sub && ', SUB'}</span>
                                <span>{movie.video}</span>
                                <span>{getAudio(objSeance.room_id)}</span>
                                <span className='accountBuyTicket__age'>{movie.age}+</span>
                            </p>
                        </div>
                        <div className="accountBuyTicket__middle">
                            <p className='accountBuyTicket__seat'>{obj.i_row} ряд, {obj.i_column} место / зал {objSeance.room_id}</p>
                            <p className='accountBuyTicket__type'>Тип места: <span>{obj.type_id}</span></p>
                        </div>
                        <p className='accountBuyTicket__cost'>{getCost(obj.type_id)} BYN</p>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default AccountBuyTicket

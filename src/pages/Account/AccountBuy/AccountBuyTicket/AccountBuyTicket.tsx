import React, { FC, useEffect } from 'react'
import './AccountBuyTicket.css'
import { ICard, IDataCardSelect, IDataMyCard, IDataMyMovie, IDataSeatSelect, IMovie, IRoom, ISeance } from 'src/interfaces'
import { useSelector } from 'react-redux'
import { compareTimeNowStart, getAudio, getTimePlusDuration, getTodayDayMonthYear } from 'src/helpers'

interface IAccountBuyTicket {
    obj: IDataMyMovie
}

const AccountBuyTicket:FC<IAccountBuyTicket> = ({obj}) => {
    const arrMovies: IMovie[] = useSelector(({storePages}) => storePages.arrMovies);
    const arrRooms: IRoom[] = useSelector(({storePages}) => storePages.arrRooms);

    const objMovie = arrMovies.find((item) => item.id === obj.movie_id);
    const shedule = objMovie?.schedule.find(item => item.date === obj.date);
    const objSeance = shedule?.seances.find((item) => item.id === obj.seance_id);
    const room = arrRooms.find(room => room.id === objSeance?.room_id);
    
    const getCost = (seat_type: String) => {
        return (seat_type === 'single') ? (room?.cost_single || 0) : (room?.cost_sofa || 0);
    }

    let alreadyStart = false;
    if (objSeance && getTodayDayMonthYear() === obj.date) alreadyStart = compareTimeNowStart(objSeance?.time);

    return (
        <>
        {objMovie && objSeance &&
            <div className='accountBuyTicket'>
                <img src={objMovie?.image} className='accountBuyTicket__image' alt="movie" />
                <div className="accountBuyTicket__info">
                    <p className='accountBuyTicket__title'>{objMovie.title}</p>
                    <div className="accountBuyTicket__text">
                        <div className="accountBuyTicket__left">
                            <p className={`accountBuyTicket__date-time ${alreadyStart ? 'alreadyStart' : ''}`}>
                                {obj.date} / {objSeance.time} - {getTimePlusDuration(objSeance.time, objMovie.duration)}
                            </p>
                            <p className='accountBuyTicket__other'>
                                <span>{objMovie.language}{objMovie.sub && ', SUB'}</span>
                                <span>{objMovie.video}</span>
                                <span>{getAudio(objSeance.room_id)}</span>
                                <span className='accountBuyTicket__age'>{objMovie.age}+</span>
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

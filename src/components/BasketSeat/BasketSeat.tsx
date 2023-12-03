import React, { FC, useState } from 'react'
import { ICard, IDataCardSelect, IDataSeatSelect, IMovie, IRoom, ISeance, ISeatType } from 'src/interfaces'
import './BasketSeat.css'

import cross from "src/icons/cross.svg"
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { REMOVE_MY_SEAT_SELECT } from 'src/actions/actions'
import { useParams } from 'react-router-dom'

interface IBasketSeat {
    obj: IDataSeatSelect,
    cost: number,
    setModal: (v: JSX.Element) => void
}

const BasketSeat:FC<IBasketSeat> = ({obj, cost, setModal}) => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const arrSeatTypes: ISeatType[] = useSelector(({storePages}) => storePages.seatTypes);
    const objSeatType = arrSeatTypes.find((item) => item.type === obj.seat_type);
    const arrSeatSelect: IDataSeatSelect[] = useSelector(({storeUser}) => storeUser.my_seat_select);
    const userId = useSelector(({storeUser}) => storeUser.user.id);


    const {id, date, seance} = useParams<{id: string, date: string, seance: string}>();
    const newId = (id) ? +id : 0;
    const newDate = (date) ? date : '';

    const arrMovies: IMovie[] = useSelector(({storePages}) => storePages.movies);
    const movie = arrMovies.find(movie => movie.id === newId);
    const schedule = movie?.schedule.find(item => item.date === newDate);

    const clickCross = () => {
        if (schedule) {
            const objSeat = arrSeatSelect.find((seat: IDataSeatSelect) => 
                seat.i_row === obj.i_row && seat.i_column === obj.i_column && seat.seance_id === obj.seance_id
            );
            if (objSeat) {
                const data = {
                    i_row: obj.i_row,
                    i_column: obj.i_column,
                    seat_id: objSeat.id,
                    movie_id: newId,
                    seance_id: obj.seance_id
                }
                dispatch(REMOVE_MY_SEAT_SELECT(data, setModal));
            }
        }
    }

    return (
        <div className='basketSeat'>
            <div className={`basketSeat__image ${obj.seat_type}`}>
                <img src={objSeatType?.image} alt="seat" />
            </div>
            <div className="basketSeat__info">
                <div className="basketSeat__seat-cost">
                    <span className='basketSeat__seat'>{obj.i_row} ряд / {obj.i_column} место</span>
                    <span className='basketSeat__cost'>{cost}.00 BYN</span>
                </div>
                <p className='basketSeat__type'>Тип места: <span>{obj.seat_type}</span></p>
            </div>
            <img src={cross} className='basketSeat__cross' onClick={clickCross} alt="cross" />
        </div>
    )
}

export default BasketSeat

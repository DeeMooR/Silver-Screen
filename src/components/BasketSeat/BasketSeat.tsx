import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { REMOVE_MY_SEAT_SELECT } from 'src/actions/actions'
import { IDataSeatSelect, IMovie, ISeatType } from 'src/interfaces'
import './BasketSeat.css'

import cross from "src/icons/cross.svg"

interface IBasketSeat {
    obj: IDataSeatSelect,
    cost: number,
    setModal: (v: JSX.Element) => void
}

const BasketSeat:FC<IBasketSeat> = ({obj, cost, setModal}) => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();

    const arrSeatTypes: ISeatType[] = useSelector(({storePages}) => storePages.seatTypes);
    const arrSeatSelect: IDataSeatSelect[] = useSelector(({storeUser}) => storeUser.my_seat_select);
    const {id} = useParams<{id: string}>();
    const newId = (id) ? +id : 0;

    // чтобы получить image
    const objSeatType = arrSeatTypes.find((item) => item.type === obj.seat_type);
    
    // удаление из корзины
    const clickCross = () => {
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

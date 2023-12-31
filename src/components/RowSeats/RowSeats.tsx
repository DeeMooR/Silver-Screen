import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { ADD_MY_SEAT_SELECT, REMOVE_MY_SEAT_SELECT } from 'src/actions/actions'
import { IDataSeatSelect, IMovie, IRoom, ISeatType } from 'src/interfaces'
import { SeatImage } from './styled'
import './RowSeats.css'

interface IRowSeats {
    arrRow: number[],
    room: number,
    indexRow: number,
    setModal: (v: JSX.Element) => void,
    setModalIsOpen: (v: boolean) => void
}

const RowSeats:FC<IRowSeats> = ({arrRow, room, indexRow, setModal, setModalIsOpen}) => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const arrRooms: IRoom[] = useSelector(({storePages}) => storePages.rooms);
    const arrSeatTypes: ISeatType[] = useSelector(({storePages}) => storePages.seatTypes);
    const arrSeatSelect = useSelector(({storeUser}) => storeUser.my_seat_select);
    const userId = useSelector(({storeUser}) => storeUser.user.id);
    const token = localStorage.getItem('access');

    // для изменения мест нужного сеанса
    const {id, seance} = useParams<{id: string, date: string, seance: string}>();
    const newId = (id) ? +id : 0;
    const newSeance = (seance) ? +seance : 0;
    
    // чтобы получить image
    const objRoom = arrRooms.find((item) => item.id === room);
    const objRow = objRoom?.rows[indexRow];
    const objType = arrSeatTypes.find((item: ISeatType) => item.type === objRow?.type_id);

    // изменение места
    const clickSeat = (number: number, indexRow: number, indexColumn: number) => {
        // return, если место куплено
        if (number === 1 || number === userId || (number !== -userId && number < 0)) return;

        // переход на страницу 'sign-in'
        if (!token) {
            setModalIsOpen(true);
            return;
        }

        const row = indexRow + 1;
        const column = indexColumn + 1;

        // выбрать или снять выбор места
        if (number === 0) {
            const add_my_seat_select = {
                i_row: row,
                i_column: column,
                seat_type: objType?.type || ''
            }
            dispatch(ADD_MY_SEAT_SELECT(userId, newId, newSeance, add_my_seat_select, setModal));
        } else {
            const objSeat = arrSeatSelect.find((seat: IDataSeatSelect) => 
                seat.i_row === row && seat.i_column === column && seat.seance_id === newSeance
            );
            if (objSeat) {
                const data = {
                    i_row: row,
                    i_column: column,
                    seat_id: objSeat.id,
                    movie_id: newId,
                    seance_id: newSeance
                }
                dispatch(REMOVE_MY_SEAT_SELECT(data, setModal));
            }
        }
    }

    return (
        <>
        {objType &&
            <div className='rowSeats'>
                <p className='rowSeats__number'>{indexRow + 1}</p>
                {arrRow.map((number, indexColumn) => (
                    <SeatImage
                        image={(number === -userId && token) ? objType.image_select : objType.image}
                        type={objType.type}
                        isEmpty={number === 0 ? true : false}
                        cursor={number === 0 || number == -userId ? 'pointer' : 'default'}
                        onClick={() => clickSeat(number, indexRow, indexColumn)}
                        key={indexColumn}
                    />
                ))}
                <p className='rowSeats__number'>{indexRow + 1}</p>
            </div>
        }
        </>
    )
}

export default RowSeats

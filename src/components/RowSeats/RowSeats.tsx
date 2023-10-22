import React, { FC } from 'react'
import './RowSeats.css'
import { arrRooms } from 'src/helpers'
import { useSelector } from 'react-redux'
import { SeatImage } from './styled'
import { ISeatType } from 'src/interfaces'

interface IRowSeats {
    arrRow: number[],
    room: number,
    indexRow: number
}

const RowSeats:FC<IRowSeats> = ({arrRow, room, indexRow}) => {
    const arrSeatTypes: ISeatType[] = useSelector(({storePages}) => storePages.seatTypes);
    const userId = useSelector(({store}) => store.user.id);
    const objRoom = arrRooms.find((item) => item.room === room);              // объект room: room, costSingle, costSofa, rows
    const objRow = objRoom?.rows.find((item) => item.idRow === indexRow + 1);   // объект row:  idRow, type, seats
    const objType = arrSeatTypes.find((item: ISeatType) => item.type === objRow?.type);        // объект type: type, image, description

    console.log(arrRow)
    return (
        <>
        {objType &&
            <div className='rowSeats'>
                <p className='rowSeats__number'>{indexRow + 1}</p>
                {arrRow.map((number) => (
                    <SeatImage
                        image={number === userId ? objType.imageSelect : objType.image}
                        type={objType.type}
                        isEmpty={number === 0 ? true : false}
                    />
                ))}
                <p className='rowSeats__number'>{indexRow + 1}</p>
            </div>
        }
        </>
    )
}

export default RowSeats

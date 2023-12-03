import React, { FC } from 'react'
import './Basket.css'
import { useSelector } from 'react-redux';
import { IDataCardSelect, IDataSeatSelect, IMovie, IRoom, ISeatType } from 'src/interfaces';
import BasketSeat from '../BasketSeat/BasketSeat';
import BasketCard from '../BasketCard';
import { useParams } from 'react-router-dom';

interface IBasket {
    type: 'card' | 'seat',
    setModal: (v: JSX.Element) => void

}

const Basket:FC<IBasket> = ({type, setModal}) => {
    const arrGiftSelect = useSelector(({storeUser}) => storeUser.card_select);
    const arrSeatSelect = useSelector(({storeUser}) => storeUser.my_seat_select);

    const {id, date, seance} = useParams<{id: string, date: string, seance: string}>();
    const newId = (id) ? +id : 0;
    const newDate = (date) ? date : '';
    const newSeance = (seance) ? +seance : 0;

    const arrMovies: IMovie[] = useSelector(({storePages}) => storePages.movies);
    const arrRooms: IRoom[] = useSelector(({storePages}) => storePages.rooms);
    const seatTypes: ISeatType[] = useSelector(({storePages}) => storePages.seatTypes);

    const movie = arrMovies.find(movie => movie.id === newId);
    const schedule = movie?.schedule.find(item => item.date === newDate);
    const findSeance = schedule?.seances.find(seance => seance.id === newSeance);
    const room = arrRooms.find(room => room.id === findSeance?.room_id);

    const getCost = (seat_type: String) => {
        return (seat_type === 'single') ? (room?.cost_single || 0) : (room?.cost_sofa || 0);
    }

    const sumCards = arrGiftSelect.reduce((acc: number, item: IDataCardSelect) => {
        return acc + item.cost;
    }, 0);
    const sumSeats = arrSeatSelect.reduce((acc: number, item : IDataSeatSelect) => {
        return acc + getCost(item.seat_type);
    }, 0);
    const totalCost = (type === 'card') ? sumCards : sumSeats;
    const arr = (type === 'card') ? arrGiftSelect : arrSeatSelect;

    return (
        <div className='basket'>
            <div className="basket__items">
                {arr.map((item: IDataCardSelect | IDataSeatSelect, index: number) => (
                    <div className="basket__item" key={index}>
                        {type === 'card' && <BasketCard obj={item as IDataCardSelect} />}
                        {type === 'seat' && <BasketSeat obj={item as IDataSeatSelect} cost={getCost((item as IDataSeatSelect).seat_type)} setModal={setModal} />}
                        
                    </div>
                ))}
            </div>
            <div className='basket__total'>
                <span className='basket-total__text'>Итого:</span>
                <span className='basket-total__sum'>{totalCost}.00 BYN</span>
            </div>
        </div>
    )
}

export default Basket

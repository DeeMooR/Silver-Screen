import React, { FC } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BasketSeat from '../BasketSeat';
import BasketCard from '../BasketCard';
import { IDataCardSelect, IDataSeatSelect, IMovie, IRoom } from 'src/interfaces';
import './Basket.css'

interface IBasket {
    type: 'card' | 'seat',
    setModal: (v: JSX.Element) => void

}

const Basket:FC<IBasket> = ({type, setModal}) => {
    const arrGiftSelect:IDataCardSelect[] = useSelector(({storeUser}) => storeUser.card_select);
    const arrSeatSelect: IDataSeatSelect[] = useSelector(({storeUser}) => storeUser.my_seat_select);
    const arrMovies: IMovie[] = useSelector(({storePages}) => storePages.movies);
    const arrRooms: IRoom[] = useSelector(({storePages}) => storePages.rooms);

    // чтобы дойти до room
    const {id, date, seance} = useParams<{id: string, date: string, seance: string}>();
    const newId = (id) ? +id : 0;
    const newDate = (date) ? date : '';
    const newSeance = (seance) ? +seance : 0;

    // чтобы узнать cost
    const movie = arrMovies.find(movie => movie.id === newId);
    const schedule = movie?.schedule.find(item => item.date === newDate);
    const findSeance = schedule?.seances.find(seance => seance.id === newSeance);
    const room = arrRooms.find(room => room.id === findSeance?.room_id);

    // аолучение cost
    const getCost = (seat_type: String) => {
        return (seat_type === 'single') ? (room?.cost_single || 0) : (room?.cost_sofa || 0);
    }

    const sumCards = arrGiftSelect.reduce((acc: number, item: IDataCardSelect) => {
        return acc + item.cost;
    }, 0);
    const sumSeats = arrSeatSelect.reduce((acc: number, item : IDataSeatSelect) => {
        return acc + getCost(item.seat_type);
    }, 0);

    const arr = (type === 'card') ? arrGiftSelect : arrSeatSelect;
    const totalCost = (type === 'card') ? sumCards : sumSeats;

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

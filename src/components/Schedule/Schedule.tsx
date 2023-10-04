import React, { FC } from 'react'
import { IMovie } from 'src/interfaces'
import './Schedule.css'
import ScheduleItem from './ScheduleItem/ScheduleItem';

interface ISchedule {
    movie: IMovie,
}

const Schedule:FC<ISchedule> = ({movie}) => {
    const searchDate = '02.10.2023';
    return (
        <div className='schedule'>
            <div className="schedule__left">
                <h2 className='shedule__name'>Silver Screen в ТРЦ Arena city</h2>
                <p className='shedule__place'>г. Минск, пр Победителей, 84</p>
            </div>
            <div className='schedule__right'>
            {movie.schedule.map((item, index) => (
                item.date === searchDate ? (
                    item.seances.map((itemSeance, index2) => (
                        <ScheduleItem video={movie.video} seance={itemSeance} key={index2}/>
                    ))
                ) : (
                    <p key={index}>Пусто</p>
                )
            ))}
            </div>
        </div>
    )
}

export default Schedule

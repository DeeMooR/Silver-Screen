import React, { FC } from 'react'
import { useSelector } from 'react-redux';
import ScheduleItem from './ScheduleItem/ScheduleItem';
import { filterMoviesInMoviePage } from 'src/filterMovies';
import { IMovie } from 'src/interfaces'
import './Schedule.css'

interface ISchedule {
    movie: IMovie,
}

const Schedule:FC<ISchedule> = ({movie}) => {
    const searchDate = useSelector(({store}) => store.search.date).split(', ')[1];
    const searchVideo = useSelector(({store}) => store.search.video);
    const searchAudio = useSelector(({store}) => store.search.audio);
    const searchLanguage = useSelector(({store}) => store.search.language);

    // фильтруем сеансы по выбранным параметрам
    const filteredMovie = filterMoviesInMoviePage(movie, searchDate, searchVideo, searchAudio, searchLanguage);
    
    return (
        <>
        {!filteredMovie?.length ? (
            <div className='shedule__not-find'>По выбранным параметрам сеансы не найдены.</div>
        ) : (
            <div className='schedule'>
                <div className="schedule__left">
                    <h2 className='shedule__name'>Silver Screen в ТРЦ Arena city</h2>
                    <p className='shedule__place'>г. Минск, пр Победителей, 84</p>
                </div>
                <div className='schedule__right'>
                    {filteredMovie.map((item, index) => (
                        <ScheduleItem video={movie.video} seance={item} key={index}/>
                    ))}
                </div>
            </div>
        )}
        </>
    )
}

export default Schedule

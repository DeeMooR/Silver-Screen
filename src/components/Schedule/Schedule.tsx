import React, { FC } from 'react'
import { useSelector } from 'react-redux';
import ScheduleItem from './ScheduleItem/ScheduleItem';
import { getAudio } from 'src/helpers';
import { IMovie, ISeance } from 'src/interfaces'
import './Schedule.css'

interface ISchedule {
    movie: IMovie,
}

const Schedule:FC<ISchedule> = ({movie}) => {
    const searchDate = useSelector(({ search }) => search.date).split(', ')[1];
    const searchVideo = useSelector(({ search }) => search.video);
    const searchAudio = useSelector(({ search }) => search.audio);
    let searchLanguage = useSelector(({ search }) => search.language);

    let i = 0;
    let filteredMovie: ISeance[] = [];
    
    const filterMovies = () => {
        if (!searchLanguage.length ||
            (searchLanguage.includes('SUB') && movie.isSUB) ||
            (searchLanguage.length && searchLanguage.includes(movie.language))) i++;
        if (!searchVideo.length || (searchVideo.length && searchVideo.includes(movie.video))) i++;

        const scheduleDay = movie.schedule.find(item => item.date == searchDate);
        if (scheduleDay) {
            for (const item of searchAudio) {
                switch (item) {
                case 'Dolby Digital': {
                    const addSeances = scheduleDay.seances.filter(item => ['1', '2'].includes(item.room));
                    filteredMovie.push(...addSeances);
                } break;
                case 'Dolby Atmos': {
                    const addSeances = scheduleDay.seances.filter(item => ['3', '4'].includes(item.room));
                    filteredMovie.push(...addSeances);
                } break;
                case 'Harman Kardon': {
                    const addSeances = scheduleDay.seances.filter(item => ['5', '6'].includes(item.room));
                    filteredMovie.push(...addSeances);
                } break;
                default: break;
                }
            }
            if (searchAudio.length === 0) filteredMovie = scheduleDay.seances;
            if (filteredMovie.length) i++;
        }
    }
    filterMovies();

    return (
        <div className='schedule'>
            {i !== 3 ? (
                <div className='shedule__not-find'>По выбранным параметрам сеансы не найдены.</div>
            ) : (
                <>
                <div className="schedule__left">
                    <h2 className='shedule__name'>Silver Screen в ТРЦ Arena city</h2>
                    <p className='shedule__place'>г. Минск, пр Победителей, 84</p>
                </div>
                <div className='schedule__right'>
                    {filteredMovie.map((item, index) => (
                        <ScheduleItem video={movie.video} seance={item} key={index}/>
                    ))}
                </div>
                </>
            )}
        </div>
    )
}

export default Schedule

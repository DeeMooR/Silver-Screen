import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ScheduleItem from './ScheduleItem/ScheduleItem';
import { getAudio, setTodayDateStore } from 'src/helpers';
import { IMovie, ISeance } from 'src/interfaces'
import './Schedule.css'

interface ISchedule {
    movie: IMovie,
}

const Schedule:FC<ISchedule> = ({movie}) => {
    const searchDate = useSelector(({ search }) => search.date).split(', ')[1];
    const searchVideo = useSelector(({ search }) => search.video);
    const searchAudio = useSelector(({ search }) => search.audio);
    const searchLanguage = useSelector(({ search }) => search.language);

    let i = 0;
    let filteredMovie: ISeance[] = [];
    let fixSeances: ISeance[] = [];
    let addSeances: ISeance[] = [];
    
    const filterMovies = () => {
        // Проверка "Фильм с субтитрами?"
        if (searchLanguage.includes('SUB') && !movie.isSUB) return;

        // Проверка "Фильм на выбранном языке?"
        if (!searchLanguage.length ||
            (searchLanguage.join(',') === 'SUB') ||
            (searchLanguage.length && searchLanguage.includes(movie.language))) i = 1;
        else return;

         // Проверка "Фильм в выбранном формате?"
        if ((!searchVideo.includes('2D') && !searchVideo.includes('3D')) ||
            (searchVideo.includes('2D') && movie.video === '2D') ||
            (searchVideo.includes('3D') && movie.video === '3D')) i = 1;
        else return;

        // Проверка "Есть ли сеансы в выбранную дату?"
        let scheduleDay = movie.schedule.find(item => item.date == searchDate);
        if (!scheduleDay) return;

        // Фильтрация по выбранным параметрам звука
        if (searchAudio.length) {
            console.log('in audio')
            for (const item of searchAudio) {
                switch (item) {
                case 'Dolby Digital':
                    addSeances = scheduleDay.seances.filter(item => ['1', '2'].includes(item.room));
                    filteredMovie.push(...addSeances);
                    break;
                case 'Dolby Atmos':
                    addSeances = scheduleDay.seances.filter(item => ['3', '4'].includes(item.room));
                    filteredMovie.push(...addSeances);
                    break;
                case 'Harman Kardon':
                    addSeances = scheduleDay.seances.filter(item => ['5', '6'].includes(item.room));
                    filteredMovie.push(...addSeances);
                    break;
                }
            }
        } else {
            filteredMovie = scheduleDay.seances;
        }

        // Проверка "Есть ли сеансы на IMAX или ScreenX?"
        if (searchVideo.includes('IMAX') && searchVideo.includes('ScreenX')) {
            const arrScreenX = filteredMovie.filter(item => item.room === '5');
            const arrIMAX = filteredMovie.filter(item => item.room === '6');
            filteredMovie = [...arrScreenX, ...arrIMAX];
            return;
        }
        if (searchVideo.includes('ScreenX')) {
            fixSeances = filteredMovie.filter(item => item.room === '5');
            filteredMovie = [...fixSeances];
        } 
        if (searchVideo.includes('IMAX')) {
            fixSeances = filteredMovie.filter(item => item.room === '6');
            filteredMovie = [...fixSeances];
        }
    }
    filterMovies();

    return (
        <>
        {!filteredMovie.length ? (
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

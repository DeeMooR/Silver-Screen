import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageTemplate from 'src/components/PageTemplate'
import MovieCard from 'src/components/MovieCard'
import NotFind from 'src/components/NotFind'
import Navigation from 'src/components/Navigation'
import { IMovie } from 'src/interfaces'
import { arrMovies, getArrDate, setTodayDateStore } from 'src/helpers';
import './Afisha.css'

const Afisha = () => {
    let searchDate = useSelector(({ search }) => search.date);
    if (searchDate) searchDate = searchDate.split(', ')[1]

    const searchVideo = useSelector(({ search }) => search.video);
    const searchAudio = useSelector(({ search }) => search.audio);
    let searchLanguage = useSelector(({ search }) => search.language);
    const arrDate = getArrDate();
    const dispatch = useDispatch();

    let dateFromLocalStorage = localStorage.getItem('date');
    if (dateFromLocalStorage) setTodayDateStore(dateFromLocalStorage, dispatch);
    else setTodayDateStore(arrDate[0], dispatch);
    dispatch({ type: "SET_ID_ACTIVE_MOVIE_PAGE", payload: '' });

    const scrollPosition = useSelector(({ scrollAfisha }) => scrollAfisha);
    useEffect(() => {
        if (scrollPosition !== null) {
            console.log(scrollPosition)
            window.scrollTo(0, scrollPosition);
        }
    }, []);
    
    let filteredMovies: IMovie[] = [];
    let filterOne: IMovie[];
    let addToFilterOne: IMovie[];
    
    const filterMovies = () => {
        // Фильтрация фильмов по параметру Date
        filteredMovies = arrMovies.filter(movie => {
            return movie.schedule.some(oneDay => oneDay.date === searchDate);
        })

        // Фильтрация фильмов по критерию 2D и 3D
        if (searchVideo.includes('2D') || searchVideo.includes('3D')) {
            filterOne = [];
            for (const item of searchVideo) {
                switch (item) {
                case '2D':
                    addToFilterOne = filteredMovies.filter(movie => movie.video === '2D');
                    filterOne.push(...addToFilterOne);
                    break;
                case '3D':
                    addToFilterOne = filteredMovies.filter(movie => movie.video === '3D');
                    filterOne.push(...addToFilterOne);
                    break;
                }
            }
            filteredMovies = [...filterOne];
        }

        // Фильтрация фильмов по параметру Audio
        if (searchAudio.length) {
            filterOne = [];
            for (const item of searchAudio) {
                switch (item) {
                case 'Dolby Digital':
                    addToFilterOne = filteredMovies.filter(movie => {
                        if (filterOne.some(item => item.title === movie.title)) return false;
                        let scheduleDay = movie.schedule.find(item => item.date == searchDate);
                        if (scheduleDay) return scheduleDay.seances.some(oneSeance => ['1', '2'].includes(oneSeance.room));
                        return false;
                    });
                    filterOne.push(...addToFilterOne);
                    break;
                case 'Dolby Atmos':
                    addToFilterOne = filteredMovies.filter(movie => {
                        if (filterOne.some(item => item.title === movie.title)) return false;
                        let scheduleDay = movie.schedule.find(item => item.date == searchDate);
                        if (scheduleDay) return scheduleDay.seances.some(oneSeance => ['3', '4'].includes(oneSeance.room));
                        return false;
                    });
                    filterOne.push(...addToFilterOne);
                    break;
                case 'Harman Kardon':
                    addToFilterOne = filteredMovies.filter(movie => {
                        if (filterOne.some(item => item.title === movie.title)) return false;
                        let scheduleDay = movie.schedule.find(item => item.date == searchDate);
                        if (scheduleDay) return scheduleDay.seances.some(oneSeance => ['5', '6'].includes(oneSeance.room));
                        return false;
                    });
                    filterOne.push(...addToFilterOne);
                    break;
                }
            }
            filteredMovies = [...filterOne];
        } 

        // Фильтрация фильмов если выбран тип экрана
        if (searchVideo.includes('ScreenX') || searchVideo.includes('IMAX')) {
            if (!searchAudio.length || searchAudio.includes('Harman Kardon')) {
                filterOne = [];
                for (const item of searchVideo) {
                    switch (item) {
                    case 'ScreenX':
                        addToFilterOne = filteredMovies.filter(movie => {
                            if (filterOne.some(item => item.title === movie.title)) return false;       // Если такой элемент уже был добавлен при IMAX, пропускаем его
                            let scheduleDay = movie.schedule.find(item => item.date == searchDate);     // Поиск массива сеансов в определённый день
                            if (scheduleDay) return scheduleDay.seances.some(oneSeance => oneSeance.room === '5');   // Если хотя бы в одном сеансе есть ScreenX вернёт true
                            return false;
                        });              
                        filterOne.push(...addToFilterOne);
                        break;
                    case 'IMAX':
                        addToFilterOne = filteredMovies.filter(movie => {
                            if (filterOne.some(item => item.title === movie.title)) return false;
                            let scheduleDay = movie.schedule.find(item => item.date == searchDate);
                            if (scheduleDay) return scheduleDay.seances.some(oneSeance => oneSeance.room === '6');
                            return false;
                        });
                        filterOne.push(...addToFilterOne);
                        break;
                    }
                }
                filteredMovies = [...filterOne];
            } else {
                filteredMovies = [];
            }
        }

        // Фильтрация фильмов по критерий SUB
        if (searchLanguage.includes('SUB')) {
            filteredMovies = filteredMovies.filter(movie => movie.isSUB === true);
        }

        // Фильтрация фильмов по параметру Language
        if (searchLanguage.length) {
            filterOne = [];
            for (const item of searchLanguage) {
                switch (item) {
                case 'RU':
                    addToFilterOne = filteredMovies.filter(movie => movie.language === 'RU');
                    filterOne.push(...addToFilterOne);
                    break;
                case 'ENG':
                    addToFilterOne = filteredMovies.filter(movie => movie.language === 'ENG');
                    filterOne.push(...addToFilterOne);
                    break;
                case 'BEL':
                    addToFilterOne = filteredMovies.filter(movie => movie.language === 'BEL');
                    filterOne.push(...addToFilterOne);
                    break;
                }
            }

            if (searchLanguage.join(',') !== 'SUB') filteredMovies = [...filterOne];
        }
    }
    filterMovies();
    
    return (
        <PageTemplate wrapper>
            <div className='afisha'>
                <div className='afisha__header'>
                    <h2>Афиша кино</h2>
                    <div>
                        <a href="#" className='today active'>Сейчас в кино</a>
                        <a href="#" className='soon'>Скоро</a>
                    </div>
                </div>
                <div className='afisha__navigation'>
                    <Navigation />
                </div>
                <div className='afisha__cards'>
                    {filteredMovies.map((card: IMovie, i: number) => (
                        <div className="cards__item" key={i}>
                            <MovieCard obj={card} page='afisha' />
                        </div>
                    ))}
                    <div className={`cards__item 
                        ${filteredMovies.length % 4 === 0 && "center-4"}
                        ${filteredMovies.length % 3 === 0 && "center-3"}
                        ${filteredMovies.length % 2 === 0 && "center-2"}
                    `}>
                        <NotFind />
                    </div>
                </div>
            </div>
        </PageTemplate>
    );
}

export default Afisha

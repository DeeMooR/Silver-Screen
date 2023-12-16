import { IMovie, ISeance } from "src/interfaces";

export const filterSeancesInMoviePage = (movie: IMovie, searchDate: string, arrVideo: string[], arrAudio: string[], arrLang: string[]) => {
    let arrSeances: ISeance[] = [];
    let fixSeances: ISeance[] = [];
    let filteredMovie: ISeance[] = [];
    let addSeances: ISeance[];
    let i = 0;
    
    // Проверка "Фильм с субтитрами?"
    if (arrLang.includes('SUB') && !movie.sub) return;

    // Проверка "Фильм на выбранном языке?"
    if (!arrLang.length ||
        (arrLang.join(',') === 'SUB') ||
        (arrLang.length && arrLang.includes(movie.language))) i = 1;
    else return;

     // Проверка "Фильм в выбранном формате?"
    if ((!arrVideo.includes('2D') && !arrVideo.includes('3D')) ||
        (arrVideo.includes('2D') && movie.video === '2D') ||
        (arrVideo.includes('3D') && movie.video === '3D')) i = 1;
    else return;

    // Проверка "Есть ли сеансы в выбранную дату?"
    let scheduleDay = movie.schedule.find(item => item.date == searchDate);
    if (!scheduleDay) return;

    arrSeances = scheduleDay.seances;

    // Фильтрация по выбранным параметрам звука
    if (arrAudio.length) {
        for (const item of arrAudio) {
            switch (item) {
            case 'Dolby Digital':
                addSeances = arrSeances
                    .filter(seance => {
                        return (seance) ? [1, 2].includes(seance.room_id) : false;
                    }) as ISeance[];
                filteredMovie.push(...addSeances);
                break;
            case 'Dolby Atmos':
                addSeances = arrSeances
                    .filter(seance => {
                        return (seance) ? [3, 4].includes(seance.room_id) : false;
                    }) as ISeance[];
                filteredMovie.push(...addSeances);
                break;
            case 'Harman Kardon':
                addSeances = arrSeances
                    .filter(seance => {
                        return (seance) ? [5, 6].includes(seance.room_id) : false;
                    }) as ISeance[];
                filteredMovie.push(...addSeances);
                break;
            }
        }
    } else {
        filteredMovie = arrSeances;
    }

    // Проверка "Есть ли сеансы на IMAX или ScreenX?"
    if (arrVideo.includes('IMAX') && arrVideo.includes('ScreenX')) {
        const arrScreenX = filteredMovie.filter(item => item.room_id === 5);
        const arrIMAX = filteredMovie.filter(item => item.room_id === 6);
        filteredMovie = [...arrScreenX, ...arrIMAX];
        return;
    }
    if (arrVideo.includes('ScreenX')) {
        fixSeances = filteredMovie.filter(item => item.room_id === 5);
        filteredMovie = [...fixSeances];
    } 
    if (arrVideo.includes('IMAX')) {
        fixSeances = filteredMovie.filter(item => item.room_id === 6);
        filteredMovie = [...fixSeances];
    }
    return filteredMovie;
}

export const filterMoviesInAfisha = (arrMovie: IMovie[], searchDate: string, arrVideo: string[], arrAudio: string[], arrLang: string[]) => {
    let filteredMovies: IMovie[] = [];
    let filterOne: IMovie[];
    let addToFilterOne: IMovie[];

    // Фильтрация фильмов по параметру Date
    filteredMovies = arrMovie.filter(movie => {
        return movie.schedule.some(oneDay => oneDay.date === searchDate);
    })

    // Фильтрация фильмов по критерию 2D и 3D
    if (arrVideo.includes('2D') || arrVideo.includes('3D')) {
        filterOne = [];
        for (const item of arrVideo) {
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
    if (arrAudio.length) {
        filterOne = [];
        for (const item of arrAudio) {
            switch (item) {
            case 'Dolby Digital':
                addToFilterOne = filteredMovies.filter(movie => {
                    if (filterOne.some(item => item.title === movie.title)) return false;
                    let scheduleDay = movie.schedule.find(item => item.date == searchDate);
                    return scheduleDay?.seances.some(oneSeance => [1, 2].includes(oneSeance.room_id));
                });
                filterOne.push(...addToFilterOne);
                break;
            case 'Dolby Atmos':
                addToFilterOne = filteredMovies.filter(movie => {
                    if (filterOne.some(item => item.title === movie.title)) return false;
                    let scheduleDay = movie.schedule.find(item => item.date == searchDate);
                    return scheduleDay?.seances.some(oneSeance => [3, 4].includes(oneSeance.room_id));
                });
                filterOne.push(...addToFilterOne);
                break;
            case 'Harman Kardon':
                addToFilterOne = filteredMovies.filter(movie => {
                    if (filterOne.some(item => item.title === movie.title)) return false;
                    let scheduleDay = movie.schedule.find(item => item.date == searchDate);
                    return scheduleDay?.seances.some(oneSeance => [5, 6].includes(oneSeance.room_id));
                });
                filterOne.push(...addToFilterOne);
                break;
            }
        }
        filteredMovies = [...filterOne];
    } 

    // Фильтрация фильмов если выбран тип экрана
    if (arrVideo.includes('ScreenX') || arrVideo.includes('IMAX')) {
        if (!arrAudio.length || arrAudio.includes('Harman Kardon')) {
            filterOne = [];
            for (const item of arrVideo) {
                switch (item) {
                case 'ScreenX':
                    addToFilterOne = filteredMovies.filter(movie => {
                        if (filterOne.some(item => item.title === movie.title)) return false;
                        let scheduleDay = movie.schedule.find(item => item.date == searchDate);
                        return scheduleDay?.seances.some(oneSeance => oneSeance.room_id === 5);
                    });              
                    filterOne.push(...addToFilterOne);
                    break;
                case 'IMAX':
                    addToFilterOne = filteredMovies.filter(movie => {
                        if (filterOne.some(item => item.title === movie.title)) return false;
                        let scheduleDay = movie.schedule.find(item => item.date == searchDate);
                        return scheduleDay?.seances.some(oneSeance => oneSeance.room_id === 6);
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
    if (arrLang.includes('SUB')) {
        filteredMovies = filteredMovies.filter(movie => movie.sub === true);
    }

    // Фильтрация фильмов по параметру Language
    if (arrLang.length) {
        filterOne = [];
        for (const item of arrLang) {
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

        if (arrLang.join(',') !== 'SUB') filteredMovies = [...filterOne];
    }
    return filteredMovies;
}
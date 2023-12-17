import { addDays } from "date-fns";
import { IMovie } from "src/interfaces";

const russianMonths = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const arrDaysOfWeek = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];

// получить по id критерий
export const getArrSelect = (type: string) => {
    switch(type) {
        case 'video': return ['2D', '3D', 'ScreenX', 'IMAX'];
        case 'audio': return ['Dolby Digital', 'Dolby Atmos', 'Harman Kardon'];
        case 'language': return ['Русский язык', 'Беларуская мова', 'English', 'SUB'];
        case 'shortLang': return ['RU', 'BEL', 'ENG', 'SUB'];
        default: return ['ошибка'];
    }
}
export const getAudio = (room: number) => {
    switch(room) {
        case 1: case 2: return 'Dolby Digital';
        case 3: case 4: return 'Dolby Atmos';
        case 5: case 6: return 'Harman Kardon';
        default: return 'ошибка';
    }
}
export const getRoomVideo = (room: number) => {
    switch(room) {
        case 5: return 'screenX';
        case 6: return 'IMAX';
        default: return '';
    }
}
export const getFullLanguage = (shortLang: string) => {
    switch(shortLang) {
        case 'RU': return 'Русский язык';
        case 'BEL': return 'Беларуская мова';
        case 'ENG': return 'English';
        case 'SUB': return 'SUB';
        default: return 'ошибка';
    }
}

// установить сегодняшнюю дату на 25.10.2023 
export const setTodayDate = () => {
    const date25 = new Date('2023-10-25');
    const currentTime = new Date();
    date25.setHours(currentTime.getHours());
    date25.setMinutes(currentTime.getMinutes());
    return date25;
}
const today = setTodayDate();

export const getTodayDate = () => {
    return today;
}

// установить дату в Store
export const setDateStore = (searchDate: string, dispatch: any) => {
    dispatch({ 
        type: "SET_SEARCH", 
        payload: {
            type: 'date',
            data: searchDate
        }
    });
}

// получить время окончания фильма
export const getTimePlusDuration = (date: string, duration: number) => {
    const [hours, minutes] = date.split(':').map(Number); 
    const newMinutes = minutes + duration;
    const newHours = hours + Math.floor(newMinutes / 60);
    const remainingMinutes = newMinutes % 60;

    const newTime = `${newHours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;
    return newTime;
}

// перевести из Date в '01.01.2001'
export const getDatePoints = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

// время окончания действия карты
export const getDateIn180 = () => {
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 180);
    return getDatePoints(futureDate);
};

// сравнить дату с сегодняшней
export const compareDayNowEnd = (end: string) => {
    function parseDate(dateString: any) {
        const parts = dateString.split(".");
        return new Date(parts[2], parts[1] - 1, parts[0]);
    }
    const dateToday = parseDate(getDatePoints(today));
    const dateEnd = parseDate(end);
    if (dateToday > dateEnd) return true;
    return false;
}
    
// сверить время с актуальным
export const compareTimeNowStart = (start: string) => {
    const currentDate = today;
    const [stratHours, stratMinutes] = start.split(':').map(Number);
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    if (currentHours > stratHours || (currentHours === stratHours && currentMinutes >= stratMinutes)) {
        return true;
    }
    return false;
}

// получить даты 'Сейчас' в виде 'день, 01.01.2001' С 'сегодня', 'завтра'
export const getArrDate = () => {
    const datesArray: string[] = [];
    let currentDate = today;
    for (let i = 0; i < 7; i++) {
        let dayOfWeek = arrDaysOfWeek[+currentDate.getDay()];
        if (i === 0 ) dayOfWeek = 'сегодня';
        if (i === 1 ) dayOfWeek = 'завтра';
        const dateNumMonth = getDatePoints(currentDate);
        datesArray.push(dayOfWeek + ', ' + dateNumMonth);
        currentDate = addDays(currentDate, 1);
    }
    return datesArray;
}

// получить даты 'Сейчас' в виде 'день, 01.01.2001' БЕЗ 'сегодня', 'завтра'
export const getArrDates7Days = () => {
    const currentDate = today;
    const arr = [getDatePoints(currentDate)];
    for (let i = 1; i <= 6; i++) {
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + i);
        arr.push(getDatePoints(nextDate));
    }
    return arr;
}

// добавить день недели
export const addDayOfWeek = (date: string) => {
    let fullDate = getArrDate().find((item) => {
        const itemPart = item.split(', ')[1];
        return itemPart === date;
    });
    if (fullDate) return fullDate;

    fullDate = getArrSoonDatesWithWeek().find((item) => {
        const itemPart = item.split(', ')[1];
        return itemPart === date;
    });
    if (fullDate) return fullDate;
    return 'err';
}

// из 'день, 01.01.2001' в 'день, 1 месяц'
export const formateDateItem = (item: string) => {
    const [dayOfWeek, dateNumber] = item.split(', ');
    const [dayNum, monthIndex, year] = dateNumber.split('.');
    const month = russianMonths[Number(monthIndex) - 1];
    return `${dayOfWeek}, ${+dayNum} ${month}`;
}

// получить даты сеансов фильма
export const getArrMoviesShow = (arrMovies: IMovie[], movieTypeSelect: string) => {
    if (movieTypeSelect === 'already') {
        return arrMovies.filter(movie =>  {
            return movie.schedule.some((item) => getArrDates7Days().includes(item.date));
        });
    } else {
        return arrMovies.filter(movie =>  {
            const bool = movie.schedule.some((item) => getArrDates7Days().includes(item.date));
            return (bool) ? false : true;
        });
    }
}
  
// получить даты 'Скоро в кино' в виде 'день, 01.01.2001'
export const getArrSoonDatesWithWeek = () => {
    const currentDate = today;
    const dateArray = [];
    for (let i = 0; i < 6; i++) {
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + 7 + i);
        const dayOfWeek = arrDaysOfWeek[futureDate.getDay()];
        const formattedDate = getDatePoints(futureDate);
        dateArray.push(`${dayOfWeek}, ${formattedDate}`);
    }
    return dateArray;
}
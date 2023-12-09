import { addDays } from "date-fns";
import { IMovie } from "./interfaces";

const russianMonths = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const arrDaysOfWeek = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
const today = new Date('2023-10-25');

// export const tables = ['movie', 'schedule', 'seance', 'slider', 'card', 'pageNews'];

export interface IDataInputAdmin {
    name: string,
    type: string,
    auto?: boolean
}

export interface ITable {
    title: string,
    url?: string,
    primary_key: IDataInputAdmin[],
    foreign_key: IDataInputAdmin[],
    inputs: IDataInputAdmin[]
}

export const tables = [
    {
        title: "movie",
        primary_key: [],
        foreign_key: [
            {name: 'genres', type: 'string[]'}
        ],
        inputs: [
            {name: 'language', type: 'RU|ENG|BEL'},
            {name: 'sub', type: 'boolean'},
            {name: 'image', type: 'string'},
            {name: 'title', type: 'string'},
            {name: 'age', type: 'number'},
            {name: 'video', type: 'string'},
            {name: 'duration', type: 'number'},
            {name: 'description', type: 'string'},
            {name: 'trailer', type: 'string'}
        ] 
    },
    {
        title: "schedule",
        primary_key: [],
        foreign_key: [
            {name: 'movie_id', type: 'number'}
        ],
        inputs: [
            {name: 'date', type: '01.01.2001'}
        ] 
    },
    {
        title: "seance",
        primary_key: [],
        foreign_key: [
            {name: 'room_id', type: 'number'},
            {name: 'schedule_id', type: 'number'}
        ],
        inputs: [
            {name: 'time', type: '10:24'}
        ] 
    },
    {
        title: "slider",
        primary_key: [],
        foreign_key: [],
        inputs: [
            {name: 'image', type: 'string'},
            {name: 'title?', type: 'string'},
            {name: 'text?', type: 'string'},
            {name: 'text_button?', type: 'string'},
            {name: 'link?', type: 'string'},
            {name: 'movie_id?', type: 'number'}
        ] 
    },
    {
        title: "card",
        primary_key: [],
        foreign_key: [],
        inputs: [
            {name: 'image', type: 'string'},
            {name: 'cost', type: 'number'},
            {name: 'amount', type: 'number'}
        ] 
    },
    {
        title: "pageNews",
        url: "page_news",
        primary_key: [],
        foreign_key: [],
        inputs: [
            {name: 'page', type: 'string'},
            {name: 'title', type: 'string'},
            {name: 'image', type: 'string'},
            {name: 'background_image?', type: 'string'},
            {name: 'description', type: 'string'},
            {name: 'date?', type: '01.01.2001'},
            {name: 'link?', type: 'string'}
        ] 
    },
    {
        title: "change card status",
        primary_key: [],
        foreign_key: [
            {name: 'user_id', type: 'number'},
            {name: 'number_card', type: 'number'}
        ],
        inputs: [] 
    }
];

export const getTimePlusDuration = (date: string, duration: number) => {
    const [hours, minutes] = date.split(':').map(Number); 
    const newMinutes = minutes + duration;
    const newHours = hours + Math.floor(newMinutes / 60);
    const adjustedMinutes = newMinutes % 60;

    const newTime = `${newHours.toString().padStart(2, '0')}:${adjustedMinutes.toString().padStart(2, '0')}`;
    return newTime;
}

const getDatePoints = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDate = `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;
    return formattedDate;
}

export const getTodayDate = () => {
    const currentDate = today;
    return getDatePoints(currentDate);
};

export const getDateIn180 = () => {
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 180);
    return getDatePoints(futureDate);
};

export const compareDayNowEnd = (end: string) => {
    function parseDate(dateString: any) {
        const parts = dateString.split(".");
        return new Date(parts[2], parts[1] - 1, parts[0]);
    }
    const dateToday = parseDate(getTodayDate());
    const dateEnd = parseDate(end);
    if (dateToday > dateEnd) return true;
    return false;
}
    
export const compareTimeNowStart = (strat: string) => {
    const currentDate = today;
    const [stratHours, stratMinutes] = strat.split(':').map(Number);
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    if (currentHours > stratHours || (currentHours === stratHours && currentMinutes >= stratMinutes)) {
        return true;
    }
    return false;
}

export const getTodayDayMonthYear = () => {
    let currentDate = today;
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    return `${day}.${month}.${year}`;
}

export const getArrDate = () => {
    const datesArray: string[] = [];
    let currentDate = today;
    for (let i = 0; i < 7; i++) {
        let dayOfWeek = arrDaysOfWeek[+currentDate.getDay()];
        if (i === 0 ) dayOfWeek = 'сегодня';
        if (i === 1 ) dayOfWeek = 'завтра';

        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear();
        const dateNumMonth = `${day}.${month}.${year}`;

        datesArray.push(dayOfWeek + ', ' + dateNumMonth);
        currentDate = addDays(currentDate, 1);
    }
    return datesArray;
}

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

export const formateDateItem = (item: string) => {
    const [dayOfWeek, dateNumber] = item.split(', ');
    const [dayNum, monthIndex, year] = dateNumber.split('.');
    const month = russianMonths[Number(monthIndex) - 1];
    return `${dayOfWeek}, ${+dayNum} ${month}`;
}

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

export const setDateStore = (searchDate: string, dispatch: any) => {
    const arrDate = getArrDate();
    dispatch({ 
        type: "SET_SEARCH", 
        payload: {
            type: 'date',
            data: searchDate
        }
    });
}

export const getArrDates7Days = () => {
    const formatDate = (date: Date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;
    }
        const currentDate = today;
        const arr = [formatDate(currentDate)];
    for (let i = 1; i <= 6; i++) {
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + i);
        arr.push(formatDate(nextDate));
    }
    return arr;
}

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
  
export const getArrSoonDatesWithWeek = () => {
    const formatDate = (date: Date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }
    const currentDate = today;
    const dateArray = [];
    for (let i = 0; i < 6; i++) {
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + 7 + i);
        const dayOfWeek = arrDaysOfWeek[futureDate.getDay()];
        const formattedDate = formatDate(futureDate);
        dateArray.push(`${dayOfWeek}, ${formattedDate}`);
    }
    return dateArray;
}

export const preloadImages = (...images: string[]) => {
    images.forEach((image, i) => {
      const img = new Image();
      img.src = image;
    });
  }
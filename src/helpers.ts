import { format, addDays } from "date-fns";
import { IMovie } from "./interfaces";

import img0 from "src/icons/movies/Барби.jpeg"
import img1 from "src/icons/movies/Неудержимые_4.jpeg"
import img2 from "src/icons/movies/Оппенгеймер.jpeg"
import img3 from "src/icons/movies/После_навсегда.jpeg"
import img4 from "src/icons/movies/Черепашки_Ниндзя.jpeg"
import img5 from "src/icons/movies/Элементарно.jpeg"
import img6 from "src/icons/movies/Монстр_и_маги_синих_морей.jpeg"
import img7 from "src/icons/movies/Искусство_по_понятиям.jpeg"
import img8 from "src/icons/movies/Индиана_Джонс.jpeg"
import img9 from "src/icons/movies/Дозор_джунглей_кругосветка.jpeg"
import img10 from "src/icons/movies/Иван_Семёнов.jpeg"
import img11 from "src/icons/movies/Синий_жук.jpeg"
import img12 from "src/icons/movies/Дети_шпионов.jpeg"
import img13 from "src/icons/movies/Великая_ирония.jpeg"
import img14 from "src/icons/movies/Великий_уравнитель_3.jpeg"
import img15 from "src/icons/movies/Леди_Баг_и_Супер_Кот.jpeg"

const russianMonths = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const arrDaysOfWeek = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];

export const getTodayDate = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${russianMonths[currentDate.getMonth()]}`;
    return formattedDate;
};

export const getTomorrowDate = () => {
    const currentDate = new Date();
    const tomorrowDate = addDays(currentDate, 1);
    const formattedDate = `${tomorrowDate.getDate()} ${russianMonths[tomorrowDate.getMonth()]}`;
    return formattedDate;
};

export const getArrDate = () => {
    const datesArray: string[] = [];
    let currentDate = new Date();
    for (let i = 0; i < 9; i++) {
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

export function formateDateItem(item: string) {
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

export const languageMap = {
    'RU': 'Русский язык',
    'BEL': 'Беларуская мова',
    'ENG': 'English',
};

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

export const arrMovies: IMovie[] = [
    {id: 0, image: img0, title: 'Барби', age: 12, language: 'RU', isSUB: true, genres: ['комедия', 'фэнтези', 'приключения'], video: '2D', duration: 120, 
    description: 'Барби выгоняют из Барбиленда, потому что она не соответствует его нормам красоты. Тогда она начинает новую жизнь в реальном мире, где обнаруживает, что совершенства можно достичь только благодаря внутренней гармонии.',
    trailer: 'https://www.youtube.com/watch?v=w0m2C3lN1h8',
    schedule: [
        {
            date: '05.10.2023',
            seances: [
                {room: '2', time: '10:15'},
                {room: '3', time: '11:40'},
                {room: '1', time: '12:10'},
                {room: '4', time: '14:45'},
                {room: '3', time: '15:50'},
                {room: '1', time: '17:30'},
                {room: '5', time: '18:20'},
                {room: '2', time: '19:10'},
                {room: '6', time: '20:20'},
                {room: '4', time: '21:10'},
            ]
        },
        {
            date: '06.10.2023',
            seances: [
                {room: '3', time: '10:45'},
                {room: '5', time: '11:50'},
                {room: '2', time: '13:10'},
                {room: '4', time: '14:35'},
                {room: '1', time: '15:25'},
                {room: '1', time: '17:15'},
                {room: '6', time: '18:40'},
                {room: '4', time: '19:10'},
                {room: '3', time: '20:10'},
                {room: '5', time: '21:30'},
            ]
        },
        {
            date: '07.10.2023',
            seances: [
                {room: '2', time: '10:15'},
                {room: '3', time: '11:40'},
                {room: '1', time: '12:10'},
                {room: '4', time: '14:45'},
                {room: '3', time: '15:50'},
                {room: '1', time: '17:30'},
                {room: '5', time: '18:20'},
                {room: '2', time: '19:10'},
                {room: '6', time: '20:20'},
                {room: '4', time: '21:10'},
            ]
        },
        {
            date: '08.10.2023',
            seances: [
                {room: '3', time: '10:45'},
                {room: '5', time: '11:50'},
                {room: '2', time: '13:10'},
                {room: '4', time: '14:35'},
                {room: '1', time: '15:25'},
                {room: '1', time: '17:15'},
                {room: '6', time: '18:40'},
                {room: '4', time: '19:10'},
                {room: '3', time: '20:10'},
                {room: '5', time: '21:30'},
            ]
        }
    ]},
    {id: 1, image: img1, title: 'Неудержимые 4', age: 18, language: 'RU', genres: ['комедия', 'экшн', 'боевик'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '02.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 2, image: img2, title: 'Оппенгеймер', age: 16, language: 'RU', genres: ['история', 'биография', 'драма'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 3, image: img3, title: 'После. Навсегда', age: 16, language: 'RU', genres: ['мелодрама'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 4, image: img4, title: 'Черепашки-ниндзя: Погром мутантов', age: 12, language: 'RU', genres: ['мультфильм', 'боевик', 'фантастика'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 5, image: img5, title: 'Элементарно', age: 6, language: 'RU', genres: ['комедия', 'мультфильм', 'приключения'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 6, image: img6, title: 'Монстр и маги синих морей', age: 6, language: 'RU', genres: ['комедия', 'мультфильм', 'приключения'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 7, image: img7, title: 'Искусство по понятиям', age: 18, language: 'RU', genres: ['триллер'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 8, image: img8, title: 'Индиана Джонс и колесо судьбы', age: 12, language: 'RU', genres: ['боевик', 'приключения'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 9, image: img9, title: 'Дозор джунглей: Кругосветка', age: 6, language: 'RU', genres: ['комедия', 'мультфильм', 'приключения'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 10, image: img10, title: 'Иван Семенов: Большой поход', age: 6, language: 'RU', genres: ['комедия'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 11, image: img11, title: 'Синий Жук', age: 12, language: 'RU', genres: ['боевик', 'триллер', 'фантастика'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 12, image: img12, title: 'Дети шпионов: Армагеддон', age: 6, language: 'RU', genres: ['комедия', 'боевик', 'фантастика'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 13, image: img13, title: 'Великая ирония', age: 16, language: 'RU', genres: ['мелодрама', 'триллер', 'драма'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 14, image: img14, title: 'Великий уравнитель 3', age: 18, language: 'RU', genres: ['криминал', 'боевик', 'триллер'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 15, image: img15, title: 'Леди Баг и Супер-Кот: Пробуждение силы', age: 6, language: 'RU', genres: ['мультфильм', 'фэнтези', 'приключения'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            seances: [
            ]
        }
    ]},
]
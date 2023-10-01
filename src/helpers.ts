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
    const formattedDate = `сегодня, ${currentDate.getDate()} ${russianMonths[currentDate.getMonth()]}`;
    return formattedDate;
};

export const getTomorrowDate = () => {
    const currentDate = new Date();
    const tomorrowDate = addDays(currentDate, 1);
    const formattedDate = `завтра, ${tomorrowDate.getDate()} ${russianMonths[tomorrowDate.getMonth()]}`;
    return formattedDate;
};

export const getArrDate = () => {
    const datesArray: string[] = [];
    let currentDate = new Date();
    for (let i = 0; i < 9; i++) {
        let dayOfWeek = arrDaysOfWeek[+currentDate.getDay()];
        if (i === 0 ) dayOfWeek = 'сегодня';
        if (i === 1 ) dayOfWeek = 'завтра';
        const dateNumMonth = currentDate.getDate() + ' ' + russianMonths[currentDate.getMonth()];
        datesArray.push(dayOfWeek + ', ' + dateNumMonth);
        currentDate = addDays(currentDate, 1);
    }
    return datesArray;
}

export const getArrSelect = (type: string) => {
    switch(type) {
        case 'video': return ['2D', '3D', 'ScreenX', 'IMAX'];
        case 'audio': return ['Dolby Digital', 'Dolby Atmos', 'Harman Kardon'];
        case 'language': return ['Русский язык', 'Беларуская мова', 'English', 'SUB'];
        default: return ['ошибка'];
    }
}

export const arrMovies: IMovie[] = [
    {id: 0, image: img0, title: 'Барби', age: 12, language: 'RU', genres: ['комедия', 'фэнтези', 'приключения'], video: '2D', duration: 120, 
    description: 'Барби выгоняют из Барбиленда, потому что она не соответствует его нормам красоты. Тогда она начинает новую жизнь в реальном мире, где обнаруживает, что совершенства можно достичь только благодаря внутренней гармонии.',
    trailer: 'https://www.youtube.com/watch?v=w0m2C3lN1h8',
    schedule: [
        {
            date: '01.10.2023',
            room1: ['12:10', '17:30'],
            room2: ['10:15', '19:10'],
            room3: ['11:40', '15:50'],
            room4: ['15:50', '21:10'],
            room5: ['18:20'],
            room6: ['20:20']
        }
    ]},
    {id: 1, image: img1, title: 'Неудержимые 4', age: 18, language: 'RU', genres: ['комедия', 'экшн', 'боевик'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            room1: ['12:10', '17:30'],
            room2: ['10:15', '19:10'],
            room3: [],
            room4: [],
            room5: [],
            room6: []
        }
    ]},
    {id: 2, image: img2, title: 'Оппенгеймер', age: 16, language: 'RU', genres: ['история', 'биография', 'драма'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            room1: ['12:10', '17:30'],
            room2: ['10:15', '19:10'],
            room3: [],
            room4: [],
            room5: [],
            room6: []
        }
    ]},
    {id: 3, image: img3, title: 'После. Навсегда', age: 16, language: 'RU', genres: ['мелодрама'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            room1: ['12:10', '17:30'],
            room2: ['10:15', '19:10'],
            room3: [],
            room4: [],
            room5: [],
            room6: []
        }
    ]},
    {id: 4, image: img4, title: 'Черепашки-ниндзя: Погром мутантов', age: 12, language: 'RU', genres: ['мультфильм', 'боевик', 'фантастика'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            room1: ['12:10', '17:30'],
            room2: ['10:15', '19:10'],
            room3: [],
            room4: [],
            room5: [],
            room6: []
        }
    ]},
    {id: 5, image: img5, title: 'Элементарно', age: 6, language: 'RU', genres: ['комедия', 'мультфильм', 'приключения'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            room1: ['12:10', '17:30'],
            room2: ['10:15', '19:10'],
            room3: [],
            room4: [],
            room5: [],
            room6: []
        }
    ]},
    {id: 6, image: img6, title: 'Монстр и маги синих морей', age: 6, language: 'RU', genres: ['комедия', 'мультфильм', 'приключения'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            room1: ['12:10', '17:30'],
            room2: ['10:15', '19:10'],
            room3: [],
            room4: [],
            room5: [],
            room6: []
        }
    ]},
    {id: 7, image: img7, title: 'Искусство по понятиям', age: 18, language: 'RU', genres: ['триллер'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            room1: ['12:10', '17:30'],
            room2: ['10:15', '19:10'],
            room3: [],
            room4: [],
            room5: [],
            room6: []
        }
    ]},
    {id: 8, image: img8, title: 'Индиана Джонс и колесо судьбы', age: 12, language: 'RU', genres: ['боевик', 'приключения'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            room1: ['12:10', '17:30'],
            room2: ['10:15', '19:10'],
            room3: [],
            room4: [],
            room5: [],
            room6: []
        }
    ]},
    {id: 9, image: img9, title: 'Дозор джунглей: Кругосветка', age: 6, language: 'RU', genres: ['комедия', 'мультфильм', 'приключения'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            room1: ['12:10', '17:30'],
            room2: ['10:15', '19:10'],
            room3: [],
            room4: [],
            room5: [],
            room6: []
        }
    ]},
    {id: 10, image: img10, title: 'Иван Семенов: Большой поход', age: 6, language: 'RU', genres: ['комедия'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            room1: ['12:10', '17:30'],
            room2: ['10:15', '19:10'],
            room3: [],
            room4: [],
            room5: [],
            room6: []
        }
    ]},
    {id: 11, image: img11, title: 'Синий Жук', age: 12, language: 'RU', genres: ['боевик', 'триллер', 'фантастика'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            room1: ['12:10', '17:30'],
            room2: ['10:15', '19:10'],
            room3: [],
            room4: [],
            room5: [],
            room6: []
        }
    ]},
    {id: 12, image: img12, title: 'Дети шпионов: Армагеддон', age: 6, language: 'RU', genres: ['комедия', 'боевик', 'фантастика'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            room1: ['12:10', '17:30'],
            room2: ['10:15', '19:10'],
            room3: [],
            room4: [],
            room5: [],
            room6: []
        }
    ]},
    {id: 13, image: img13, title: 'Великая ирония', age: 16, language: 'RU', genres: ['мелодрама', 'триллер', 'драма'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            room1: ['12:10', '17:30'],
            room2: ['10:15', '19:10'],
            room3: [],
            room4: [],
            room5: [],
            room6: []
        }
    ]},
    {id: 14, image: img14, title: 'Великий уравнитель 3', age: 18, language: 'RU', genres: ['криминал', 'боевик', 'триллер'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            room1: ['12:10', '17:30'],
            room2: ['10:15', '19:10'],
            room3: [],
            room4: [],
            room5: [],
            room6: []
        }
    ]},
    {id: 15, image: img15, title: 'Леди Баг и Супер-Кот: Пробуждение силы', age: 6, language: 'RU', genres: ['мультфильм', 'фэнтези', 'приключения'], video: '', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '01.10.2023',
            room1: ['12:10', '17:30'],
            room2: ['10:15', '19:10'],
            room3: [],
            room4: [],
            room5: [],
            room6: []
        }
    ]},
]
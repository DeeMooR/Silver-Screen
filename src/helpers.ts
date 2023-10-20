import { format, addDays } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { IMovie, INews, ISlide } from "./interfaces";

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
import img16 from "src/icons/movies/Мой_хатико.jpeg"
import img17 from "src/icons/movies/Призраки_в_Венеции.jpeg"
import img18 from "src/icons/movies/Дурные_деньги.jpeg"
import img19 from "src/icons/movies/Особняк_с_привидениями.jpeg"
import img20 from "src/icons/movies/Создатель.jpeg"
import img21 from "src/icons/movies/Смешарики_снимают_кино.jpeg"

import img101 from "src/icons/main_slidebar/Создатель.jpg"
import img102 from "src/icons/main_slidebar/Смешарики_снимают_кино.jpg"
import img103 from "src/icons/main_slidebar/Мой_хатико.jpg"
import img104 from "src/icons/main_slidebar/Призраки_в_Венеции.jpg"
import img105 from "src/icons/main_slidebar/Дурные_деньги.jpg"
import img106 from "src/icons/main_slidebar/Особняк_с_привидениями.jpg"
import img107 from "src/icons/main_slidebar/Барби.jpg"
import img108 from "src/icons/main_slidebar/Подарочная_карта.png"
import img109 from "src/icons/main_slidebar/День_рождения.jpg"

import entertainment_1 from "src/icons/entertainment/entertainment_1.jpg"
import entertainment_2 from "src/icons/entertainment/entertainment_2.jpg"
import entertainment_3 from "src/icons/entertainment/entertainment_3.jpg"
import entertainment_4 from "src/icons/entertainment/entertainment_4.png"
import entertainment_5 from "src/icons/entertainment/entertainment_5.jpg"
import entertainment_bg1 from "src/icons/entertainment/entertainment_bg1.jpg"
import entertainment_bg2 from "src/icons/entertainment/entertainment_bg2.jpg"
import entertainment_bg3 from "src/icons/entertainment/entertainment_bg3.jpg"
import entertainment_main from "src/icons/entertainment/entertainment_main.png"

import news_1 from "src/icons/news/news_1.jpg"
import news_2 from "src/icons/news/news_2.jpg"
import news_3 from "src/icons/news/news_3.jpg"
import news_4 from "src/icons/news/news_4.jpg"
import news_5 from "src/icons/news/news_5.png"
import news_6 from "src/icons/news/news_6.png"
import news_7 from "src/icons/news/news_7.png"
import news_8 from "src/icons/news/news_8.png"
import news_9 from "src/icons/news/news_9.jpg"
import news_10 from "src/icons/news/news_10.jpg"

import services from "src/icons/afisha_services.jpg"
import visa from "src/icons/afisha_visa.jpg"
import visa_background from "src/icons/afisha_visa_background.png"

import afisha_news from "src/icons/afisha_news.jpg"

import presentcard_1 from "src/icons/presentcard/presentcard_1.png"
import presentcard_2 from "src/icons/presentcard/presentcard_2.png"
import presentcard_3 from "src/icons/presentcard/presentcard_3.png"
import presentcard_4 from "src/icons/presentcard/presentcard_4.png"
import presentcard_5 from "src/icons/presentcard/presentcard_5.png"
import presentcard_6 from "src/icons/presentcard/presentcard_6.png"
import presentcard_main from "src/icons/presentcard/presentcard_main.jpg"

const russianMonths = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const arrDaysOfWeek = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];

export const mainEntertainment = {
    id: 1,
    image: 'https://i.ibb.co/gTsqwGk/entertainment-main.png',
    title: 'Развлечения',
    text: 'Смотрите концерты, пойте в караоке, отмечайте семейные праздники или играйте в видеоигры на большом экране'
}
export const mainVisa = {
    id: 1,
    image: visa_background,
    title: 'Мир привилегий VISA',
    text: 'АКЦИЯ'
}
export const arrPresentCard = {
    id: 1,
    image: 'https://i.ibb.co/C0M7cYR/presentcard-main.jpg',
    title: 'Подарочная карта',
    text: 'Вдохновляющие премьеры, трогательные театральные постановки, детские праздники или просто новый вкус свежего попкорна!'
}

export const arrMainNews: INews[] = [
    {
        id: 1,
        image: services,
        title: 'Услуги',
        description: 'Бронируйте кинозалы, Media room и Party room или арендуйте кинопространство целиком – смотрите, празднуйте, обучайтесь с удовольствием!',
        link: '/entertainment'
    },
    {
        id: 2,
        image: visa,
        background_image: visa_background,
        title: 'Мир привилегий VISA',
        description: 'При оплате билетов в кинопространствах mooon и Silver Screen платежными карточками Visa вы получаете скидку!',
        date: 'Акция',
        link: '/visa'
    }
]

export const arrAfishaNews: INews = {
    id: 1,
    image: afisha_news,
    title: 'Подарочные карты',
    description: 'Подарочные карты — лучший способ дарить кино!',
    link: '/presentcard'
}

export const arrEntertainmentNews: INews[] = [
    {
        id: 1,
        image: 'https://i.ibb.co/2nGnVwd/entertainment-1.jpg',
        background_image: 'https://i.ibb.co/7k7wG5Z/entertainment-bg1.jpg',
        title: 'Аренда кинопространства',
        description: 'Смотрите, играйте, учитесь, отмечайте - весь кинозал в вашем распоряжении.'
    },
    {
        id: 2,
        image: 'https://i.ibb.co/z2gjpfM/entertainment-2.jpg',
        background_image: 'https://i.ibb.co/BrPftpS/entertainment-bg2.jpg',
        title: 'Праздник в кино',
        description: 'Ярко и необычно отпразднуйте День Рождения ваших маленьких героев',
    },
    {
        id: 3,
        image: 'https://i.ibb.co/ChSNScB/entertainment-3.jpg',
        background_image: 'https://i.ibb.co/7k7wG5Z/entertainment-bg1.jpg',
        title: 'Media room',
        description: 'Современный зал с лазерным проектором Samsung Premiere c 4К разрешением и аудиосистемой с функцией объемного звука для компаний до 9 человек.',
    },
    {
        id: 4,
        image: 'https://i.ibb.co/71DBthb/entertainment-4.png',
        background_image: 'https://i.ibb.co/ypPtz2v/entertainment-bg3.jpg',
        title: 'Игровая комната - XPLAY',
        description: 'Новейшие приставки и десятки видеоигр на выбор. Доступно только в mooon в ТРК Triniti (Гродно)',
    },
    {
        id: 5,
        image: 'https://i.ibb.co/k1pJsXG/entertainment-5.jpg',
        background_image: 'https://i.ibb.co/BrPftpS/entertainment-bg2.jpg',
        title: 'Комната для вечеринок – Party Room',
        description: 'Отдельная комната с большим экраном, удобными диванчиками, видеоиграми и караоке для незабываемого отдыха с друзьями и близкими. Доступно только в mooon в ТРК Triniti (Гродно)',
    }
]


export const arrNewsPageNews: INews[] = [
    {
        id: 1,
        image: news_1,
        title: 'Обновление детского кинопространства mooon Kids в ТРЦ Palazzo!',
        description: 'В кинопространстве mooon в ТРЦ Palazzo обновился детский кинозал и игровая зона BNB Kids. Партнером проекта выступил БНБ-Банк.'
    },
    {
        id: 2,
        image: news_2,
        title: 'Кинопикники в городе',
        description: 'Свежий воздух, любимые фильмы, вкусная еда и яркие развлечения - все это включает в себя проект летнего кинотеатра под открытым небом "Кинопикники в городе".',
        date: '05 июля 2023'
    },
    {
        id: 3,
        image: news_3,
        title: 'В кинопространстве mooon в ТРЦ Dana Mall открылся детский кинозал MTB Kids by Visa',
        description: 'Детский кинозал и игровая зона открылись 1 июня в кинопространстве mooon в Dana Mall. Спонсорами детского пространства стали сразу два известных финансовых бренда – МТБанк и Visa.',
        date: '02 июня 2023'
    },
    {
        id: 4,
        image: news_4,
        title: 'Яркие выходные в Media room со скидкой до 30%',
        description: 'Хотите просмотреть любимый фильм или сериал, фото со свадьбы или спортивную онлайн трансляцию? Значит вам в Media room!',
        date: '04 апреля 2023'
    },
    {
        id: 5,
        image: news_5,
        title: 'Что посмотреть кино в апреле',
        description: 'Апрель порадует киноманов своим разнообразием: экшены, спорт, добрые мультфильмы и первый фильм, снятый в космосе!',
        date: '04 апреля 2023'
    },
    {
        id: 6,
        image: news_6,
        title: 'mooon+ — проект для самой искушенной публики',
        description: 'Прямые трансляции спектаклей, лекции, яркие балетные поставки, зрелищные спортивные события – все это ждет вас в апреле на большом экране в кинопространствах mooon.',
        date: '04 апреля 2023'
    },
    {
        id: 7,
        image: news_7,
        title: 'Открытие кинопространства mooon в ТРЦ Palazzo',
        description: '4 августа открылось кинопространство под новым брендом mooon в ТРЦ Palazzo.',
        date: '04 августа 2022'
    },
    {
        id: 8,
        image: news_8,
        title: 'Открытие первого в Беларуси кинозала с кроватями',
        description: '4 августа в составе нового кинопространства mooon в ТРЦ Palazzo откроется уникальный и единственный в Беларуси кинозал с самыми настоящими кроватями.',
        date: '02 августа 2022'
    },
    {
        id: 9,
        image: news_9,
        title: 'NICE PRICE',
        description: 'Лето приятно проводить вместе с Silver Screen и mooon!',
        date: '12 июля 2022'
    },
    {
        id: 10,
        image: news_10,
        title: 'KIDS DAY в Silver Screen',
        description: 'В Международный день защиты детей любой билет на сеансы в Silver Screen и mooon по детской цене – 7 BYN!',
        date: '27 мая 2022'
    }
]

function formatDate(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDate = `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;
    return formattedDate;
}

export const getTodayDate = () => {
    const today = new Date();
    return formatDate(today);
};

export const getDateIn180 = () => {
    const future = new Date();
    future.setDate(future.getDate() + 180);
    return formatDate(future);
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

export const setTodayDateStore = (searchDate: string, dispatch: any) => {
    const arrDate = getArrDate();
    dispatch({ 
        type: "SET_SEARCH", 
        payload: {
            type: 'date',
            data: searchDate
        }
    });
}

export const arrSliderSwiper: ISlide[] = [
    {id: 1, image: img101, idFilm: 20},
    {id: 2, image: img102, idFilm: 21},
    {id: 3, image: img103, idFilm: 16},
    {id: 4, image: img104, idFilm: 17},
    {id: 5, image: img105, idFilm: 18},
    {id: 6, image: img106, idFilm: 19},
    {id: 7, image: img107, idFilm: 0},
    {id: 8, image: img108, title: 'Дарите радость от неожиданных эмоций!', text: 'Электронные подарочные карты mooon и silver screen', textButton: 'Подробнее', link: '/presentcard'},
    {id: 9, image: img109, title: 'Детский день рождения в кино', text: ' ', textButton: 'Отпраздновать в mooon'},
]

export const arrMovies: IMovie[] = [
    {id: 0, image: img0, title: 'Барби', age: 12, language: 'RU', isSUB: true, genres: ['комедия', 'фэнтези', 'приключения'], video: '2D', duration: 120, 
    description: 'Барби выгоняют из Барбиленда, потому что она не соответствует его нормам красоты. Тогда она начинает новую жизнь в реальном мире, где обнаруживает, что совершенства можно достичь только благодаря внутренней гармонии.',
    trailer: 'https://www.youtube.com/watch?v=w0m2C3lN1h8',
    schedule: [
        {
            date: '10.10.2023',
            seances: [
                { room: '3', time: '10:45' },
                { room: '5', time: '11:50' },
                { room: '2', time: '13:10' },
                { room: '4', time: '14:35' },
                { room: '1', time: '15:25' },
                { room: '1', time: '17:15' },
                { room: '6', time: '18:40' },
                { room: '4', time: '19:10' },
                { room: '3', time: '20:10' },
                { room: '5', time: '21:30' },
            ]
        },
        {
            date: '11.10.2023',
            seances: [
                { room: '1', time: '10:30' },
                { room: '2', time: '11:45' },
                { room: '3', time: '12:20' },
                { room: '4', time: '14:55' },
                { room: '5', time: '15:50' },
                { room: '1', time: '17:40' },
                { room: '3', time: '18:15' },
                { room: '2', time: '19:25' },
                { room: '6', time: '20:30' },
            ]
        },
        {
            date: '12.10.2023',
            seances: [
                { room: '4', time: '10:10' },
                { room: '2', time: '11:35' },
                { room: '3', time: '12:30' },
                { room: '1', time: '14:45' },
                { room: '5', time: '15:55' },
                { room: '6', time: '17:20' },
                { room: '1', time: '18:30' },
                { room: '2', time: '19:50' },
            ]
        },
        {
            date: '13.10.2023',
            seances: [
                { room: '2', time: '10:15' },
                { room: '3', time: '11:40' },
                { room: '1', time: '12:10' },
                { room: '4', time: '14:45' },
                { room: '3', time: '15:50' },
                { room: '1', time: '17:30' },
                { room: '5', time: '18:20' },
                { room: '2', time: '19:10' },
                { room: '6', time: '20:20' },
                { room: '4', time: '21:10' },
            ]
        },
    ]},
    {id: 1, image: img1, title: 'Неудержимые 4', age: 18, language: 'RU', genres: ['комедия', 'экшн', 'боевик'], video: '2D', duration: 110, 
    description: 'Неудержимые несут потери: Барни Росс выбывает из строя, а Ли Кристмас отстранен от будущих операций. В команду набирают новых бойцов и отправляют возмещать ущерб. Но и они терпят поражение и попадают в плен. Теперь Ли Кристмас должен в одиночку пробраться в логово противника и освободить команду, попутно предотвратив глобальную катастрофу. Только так можно спасти мир и восстановить репутацию Неудержимых.',
    trailer: 'https://www.youtube.com/watch?v=Oh6hSeN4Nag',
    schedule: [
        {
            date: '13.10.2023',
            seances: [
                { room: '1', time: '10:15' },
                { room: '3', time: '11:40' },
                { room: '4', time: '12:10' },
                { room: '2', time: '14:30' },
                { room: '6', time: '15:45' },
                { room: '5', time: '17:20' },
                { room: '4', time: '18:35' },
            ]
        },
        {
            date: '14.10.2023',
            seances: [
                { room: '2', time: '10:15' },
                { room: '3', time: '11:40' },
                { room: '1', time: '12:10' },
                { room: '4', time: '14:45' },
                { room: '3', time: '15:50' },
                { room: '1', time: '17:30' },
                { room: '5', time: '18:20' },
                { room: '2', time: '19:10' },
                { room: '6', time: '20:20' },
                { room: '4', time: '20:50' },
                { room: '5', time: '21:20' },
            ]
        },
        {
            date: '16.10.2023',
            seances: [
                { room: '1', time: '10:30' },
                { room: '2', time: '11:45' },
                { room: '3', time: '12:20' },
                { room: '4', time: '14:55' },
                { room: '5', time: '15:50' },
                { room: '1', time: '17:40' },
                { room: '3', time: '18:15' },
                { room: '2', time: '19:25' },
                { room: '6', time: '20:30' },
                { room: '5', time: '21:10' },
            ]
        },
        {
            date: '18.10.2023',
            seances: [
                { room: '4', time: '10:10' },
                { room: '2', time: '11:35' },
                { room: '3', time: '12:30' },
                { room: '1', time: '14:45' },
                { room: '5', time: '15:55' },
                { room: '6', time: '17:20' },
                { room: '1', time: '18:30' },
                { room: '2', time: '20:20' },
                { room: '4', time: '21:10' },
                { room: '3', time: '21:30' },
            ]
        }
    ]},
    {id: 2, image: img2, title: 'Оппенгеймер', age: 16, language: 'ENG', isSUB: true, genres: ['история', 'биография', 'драма'], video: '2D', duration: 185, 
    description: 'История жизни американского физика Роберта Оппенгеймера, который стоял во главе первых разработок ядерного оружия.',
    trailer: 'https://www.youtube.com/watch?v=zU2vtD7npd0',
    schedule: [
        {
            date: '14.10.2023',
            seances: [
                { room: '1', time: '10:15' },
                { room: '2', time: '11:40' },
                { room: '3', time: '12:10' },
                { room: '4', time: '14:30' },
                { room: '5', time: '15:45' },
                { room: '6', time: '17:20' },
                { room: '1', time: '18:35' },
                { room: '2', time: '19:45' },
                { room: '3', time: '20:55' },
            ]
        },
        {
            date: '15.10.2023',
            seances: [
                { room: '6', time: '10:30' },
                { room: '4', time: '11:45' },
                { room: '5', time: '12:20' },
                { room: '3', time: '14:50' },
                { room: '2', time: '15:55' },
                { room: '4', time: '17:40' },
                { room: '1', time: '18:15' },
                { room: '3', time: '19:20' },
                { room: '5', time: '20:30' },
                { room: '6', time: '21:10' },
            ]
        },
        {
            date: '17.10.2023',
            seances: [
                { room: '1', time: '10:10' },
                { room: '2', time: '11:35' },
                { room: '4', time: '12:30' },
                { room: '6', time: '14:45' },
                { room: '3', time: '15:55' },
                { room: '1', time: '17:20' },
                { room: '2', time: '18:30' },
                { room: '3', time: '19:40' },
                { room: '4', time: '20:50' },
                { room: '5', time: '21:10' },
                { room: '6', time: '21:30' },
            ]
        },
        {
            date: '19.10.2023',
            seances: [
                { room: '3', time: '10:15' },
                { room: '5', time: '11:40' },
                { room: '1', time: '12:10' },
                { room: '2', time: '14:30' },
                { room: '3', time: '15:45' },
                { room: '6', time: '17:20' },
                { room: '4', time: '18:35' },
                { room: '5', time: '19:45' },
                { room: '2', time: '20:55' },
                { room: '1', time: '21:10' },
            ]
        }
    ]},
    {id: 3, image: img3, title: 'После. Навсегда', age: 16, language: 'RU', genres: ['мелодрама'], video: '3D', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '13.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 4, image: img4, title: 'Черепашки-ниндзя: Погром мутантов', age: 12, language: 'RU', genres: ['мультфильм', 'боевик', 'фантастика'], video: '3D', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '14.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 5, image: img5, title: 'Элементарно', age: 6, language: 'RU', isSUB: true, genres: ['комедия', 'мультфильм', 'приключения'], video: '3D', duration: 105, 
    description: 'В Городе Стихий обитатели огня, воды, земли и воздуха живут вместе. У сильной и вспыльчивой Эмбер завязывается дружба с расслабленным, плывущим по течению Уэйдом — дружба, которая бросит вызов её представлениям о мире вокруг.',
    trailer: '',
    schedule: [
        {
            date: '15.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 6, image: img6, title: 'Монстр и маги синих морей', age: 6, language: 'RU', genres: ['комедия', 'мультфильм', 'приключения'], video: '3D', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '16.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 7, image: img7, title: 'Искусство по понятиям', age: 18, language: 'RU', genres: ['триллер'], video: '2D', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '13.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 8, image: img8, title: 'Индиана Джонс и колесо судьбы', age: 12, language: 'RU', genres: ['боевик', 'приключения'], video: '3D', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '14.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 9, image: img9, title: 'Дозор джунглей: Кругосветка', age: 6, language: 'RU', isSUB: true, genres: ['комедия', 'мультфильм', 'приключения'], video: '3D', duration: 0, 
    description: '',
    trailer: '',
    schedule: [
        {
            date: '15.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 10, image: img10, title: 'Иван Семенов: Большой поход', age: 6, language: 'RU', genres: ['комедия'], video: '2D', duration: 90, 
    description: 'В жизни Ивана Семёнова — неутомимого фантазёра и неудержимого проказника — новая беда. Его школьная любовь — Танечка, чьей дружбы он добивался, уезжает учиться за границу. Иван, пытаясь остановить её отъезд, идёт на все возможные ухищрения: подкуп её родителей, предложение руки и сердца, и даже похищение! Но в результате добивается лишь одного — ему запрещают приближаться к ней. Теперь остановить переезд любимой Ивану поможет только чудо! И чудо это — Шаман, который исполняет любые желания.',
    trailer: 'https://www.youtube.com/watch?v=-MWFfzxzWgI',
    schedule: [
        {
            date: '16.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 11, image: img11, title: 'Синий Жук', age: 12, language: 'RU', genres: ['боевик', 'триллер', 'фантастика'], video: '3D', duration: 130, 
    description: 'Мексиканский подросток Хайме Рейес получает инопланетный костюм, который даёт ему суперсилы.',
    trailer: 'https://www.youtube.com/watch?v=aV_an1PcDXs',
    schedule: [
        {
            date: '18.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 12, image: img12, title: 'Дети шпионов: Армагеддон', age: 6, language: 'RU', genres: ['комедия', 'боевик', 'фантастика'], video: '2D', duration: 110, 
    description: 'Дети величайших в мире секретных агентов невольно помогают могущественному разработчику игр выпустить компьютерный вирус, который дает ему контроль над всеми технологиями, в результате чего они сами становятся шпионами, чтобы спасти своих родителей и весь мир.',
    trailer: 'https://www.youtube.com/watch?v=8NkgQ0Odiew',
    schedule: [
        {
            date: '13.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 13, image: img13, title: 'Великая ирония', age: 16, language: 'RU', genres: ['мелодрама', 'триллер', 'драма'], video: '2D', duration: 100, 
    description: 'Осенний Париж всегда особенно романтичен. Словно по иронии судьбы, успешная, но несчастная в браке Фанни сталкивается там со своим одноклассником, которого не видела много лет. Вспоминая беззаботную юность в Нью-Йорке, она решается на роман с обаятельным писателем, который терял от неё голову ещё в школьные годы. Но когда ревнивый муж начинает что-то подозревать, невинная интрижка постепенно превращается в порочную игру, ставкой в которой может быть сама жизнь.',
    trailer: 'https://www.youtube.com/watch?v=LrBznZYVOLM',
    schedule: [
        {
            date: '14.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 14, image: img14, title: 'Великий уравнитель 3', age: 18, language: 'RU', genres: ['криминал', 'боевик', 'триллер'], video: '2D', duration: 115, 
    description: 'Покончив с работой тайного агента Роберт Макколл продолжает отстаивать правду в повседневной жизни и защищать тех, кто в этом нуждается. Находясь в Южной Италии он узнает, что его друзья оказались под влиянием местных криминальных авторитетов. Когда события обостряются, Макколл решает встать на защиту справедливости, вступив в борьбу с мафией.',
    trailer: 'https://www.youtube.com/watch?v=9miykCyQcmc',
    schedule: [
        {
            date: '15.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 15, image: img15, title: 'Леди Баг и Супер-Кот', age: 6, language: 'RU', genres: ['мультфильм', 'фэнтези', 'приключения'], video: '3D', duration: 110, 
    description: 'В обыкновенной французской школе учатся девочка Маринетт и её одноклассник Андриан, в которого она влюблена. Казалось бы, классическая история первой любви, но… Эти ребята — совсем не те, за кого себя выдают. Когда миру угрожает опасность, Маринетт превращается в супергероиню Леди Баг, а Адриан — в Супер-Кота. Их невероятные способности помогают бороться со злом, но при этом никто из них не знает, кто на самом деле скрывается под маской.',
    trailer: 'https://www.youtube.com/watch?v=rY2OLeGYsdU',
    schedule: [
        {
            date: '16.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 16, image: img16, title: 'Мой Хатико', age: 12, language: 'RU', genres: ['семейный', 'драма'], video: '3D', duration: 135, 
    description: 'Кто не знает Хатико? Однажды профессор подобрал на улице бездомного милого щенка. Несмотря на протесты семьи, он оставляет пушистика дома, и вскоре тот вырастает в доброго и преданного пса. Любовь к обаятельной собаке сближает членов семьи, добавляет ей тепла и уюта. История жизни профессора и преданного пса навсегда стала примером самой искренней дружбы.',
    trailer: 'https://www.youtube.com/watch?v=TsaJmJg9RIc',
    schedule: [
        {
            date: '13.10.2023',
            seances: [
                { room: '4', time: '12:10' },
                { room: '6', time: '15:45' },
            ]
        }
    ]},
    {id: 17, image: img17, title: 'Призраки в Венеции', age: 16, language: 'RU', genres: ['детектив', 'драма', 'ужасы'], video: '2D', duration: 110, 
    description: 'Венеция. Вышедший на пенсию Эркюль Пуаро неохотно посещает спиритический сеанс, во время которого один из гостей оказывается убит. Бывший детектив берется за расследование.',
    trailer: 'https://www.youtube.com/watch?v=scT3B2iOTZ0',
    schedule: [
        {
            date: '14.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 18, image: img18, title: 'Дурные деньги', age: 18, language: 'RU', genres: ['комедия', 'биография', 'драма'], video: '2D', duration: 110, 
    description: 'Говорят, что миром правят деньги. А деньгами распоряжается Уолл-Стрит. И если на самом верху решили, что небольшая сеть магазинов видеоигр должна обанкротиться, то под это можно брать кредит в банке! Но однажды обычные люди сказали «нет» и дали бой мировым биржам. Геймеры, тик-токеры, домохозяйки и мелкие инвесторы принялись скупать акции и «сломали» Уолл-Стрит, попутно заработав дурные деньги! Эта абсолютно реальная история стала настоящим глобальным феноменом и доказала, что люди способны на все, если они объединятся.',
    trailer: 'https://www.youtube.com/watch?v=BqbyPQA4V70',
    schedule: [
        {
            date: '15.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 19, image: img19, title: 'Особняк с привидениями', age: 16, language: 'RU', genres: ['детектив', 'комедия', 'фэнтези'], video: '3D', duration: 130, 
    description: 'Мать-одиночка нанимает экстрасенса, священника и историка, чтобы они помогли изгнать нечистую силу из недавно купленного особняка.',
    trailer: 'https://www.youtube.com/watch?v=Oz2mdlgzSyA',
    schedule: [
        {
            date: '17.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 20, image: img20, title: 'Создатель', age: 16, language: 'ENG', isSUB: true, genres: ['боевик', 'фантастика', 'приключения'], video: '2D', duration: 135, 
    description: 'На фоне войны будущего между человечеством и силами искусственного интеллекта, Джошуа, закаленный в боях и бывший оперативный агент переживает исчезновение своей жены, и теперь ему предстоит найти и уничтожить Создателя — неуловимого архитектора, создавшего искусственный интеллект и таинственное оружие, способное положить конец войне и всему людскому роду.',
    trailer: 'https://www.youtube.com/watch?v=JEEQjpNT8BQ',
    schedule: [
        {
            date: '15.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 21, image: img21, title: 'Смешарики снимают кино', age: 6, language: 'RU', genres: ['мультфильм', 'приключения'], video: '3D', duration: 65, 
    description: 'Смешарики снимают кино! И не просто кино, а целый сборник из нескольких короткометражных фильмов. В программе боевик и комедия, фантастика и фэнтези, мюзикл и немое кино. А также эльфы, феи, древние пророчества, мировое зло, Пин Бонд и роботы-дроиды. Хотите заглянуть на съёмочную площадку и увидеть, как создают киношедевры? Тогда поспешите – съёмочная группа Смешариков уже ждёт вас.',
    trailer: 'https://www.youtube.com/watch?v=5u7Pzv53eF4',
    schedule: [
        {
            date: '15.10.2023',
            seances: [
            ]
        }
    ]}
]
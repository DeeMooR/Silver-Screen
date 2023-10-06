import { format, addDays } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
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
    if (!searchDate) {
        dispatch({ 
            type: "SET_SEARCH", 
            payload: {
                type: 'date',
                data: arrDate[0]
            }
        });
    }
}


export const arrMovies: IMovie[] = [
    {id: 0, image: img0, title: 'Барби', age: 12, language: 'RU', isSUB: true, genres: ['комедия', 'фэнтези', 'приключения'], video: '2D', duration: 120, 
    description: 'Барби выгоняют из Барбиленда, потому что она не соответствует его нормам красоты. Тогда она начинает новую жизнь в реальном мире, где обнаруживает, что совершенства можно достичь только благодаря внутренней гармонии.',
    trailer: 'https://www.youtube.com/watch?v=w0m2C3lN1h8',
    schedule: [
        {
            date: '06.10.2023',
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
            date: '07.10.2023',
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
            date: '08.10.2023',
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
            date: '09.10.2023',
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
            date: '07.10.2023',
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
            date: '08.10.2023',
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
            date: '09.10.2023',
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
            date: '10.10.2023',
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
    {id: 2, image: img2, title: 'Оппенгеймер', age: 16, language: 'RU', genres: ['история', 'биография', 'драма'], video: '2D', duration: 185, 
    description: 'История жизни американского физика Роберта Оппенгеймера, который стоял во главе первых разработок ядерного оружия.',
    trailer: 'https://www.youtube.com/watch?v=zU2vtD7npd0',
    schedule: [
        {
            date: '06.10.2023',
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
            date: '07.10.2023',
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
            date: '08.10.2023',
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
            date: '09.10.2023',
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
    {id: 5, image: img5, title: 'Элементарно', age: 6, language: 'RU', genres: ['комедия', 'мультфильм', 'приключения'], video: '3D', duration: 105, 
    description: 'В Городе Стихий обитатели огня, воды, земли и воздуха живут вместе. У сильной и вспыльчивой Эмбер завязывается дружба с расслабленным, плывущим по течению Уэйдом — дружба, которая бросит вызов её представлениям о мире вокруг.',
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
    {id: 10, image: img10, title: 'Иван Семенов: Большой поход', age: 6, language: 'RU', genres: ['комедия'], video: '2D', duration: 90, 
    description: 'В жизни Ивана Семёнова — неутомимого фантазёра и неудержимого проказника — новая беда. Его школьная любовь — Танечка, чьей дружбы он добивался, уезжает учиться за границу. Иван, пытаясь остановить её отъезд, идёт на все возможные ухищрения: подкуп её родителей, предложение руки и сердца, и даже похищение! Но в результате добивается лишь одного — ему запрещают приближаться к ней. Теперь остановить переезд любимой Ивану поможет только чудо! И чудо это — Шаман, который исполняет любые желания.',
    trailer: 'https://www.youtube.com/watch?v=-MWFfzxzWgI',
    schedule: [
        {
            date: '01.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 11, image: img11, title: 'Синий Жук', age: 12, language: 'RU', genres: ['боевик', 'триллер', 'фантастика'], video: '3D', duration: 130, 
    description: 'Мексиканский подросток Хайме Рейес получает инопланетный костюм, который даёт ему суперсилы.',
    trailer: 'https://www.youtube.com/watch?v=aV_an1PcDXs',
    schedule: [
        {
            date: '01.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 12, image: img12, title: 'Дети шпионов: Армагеддон', age: 6, language: 'RU', genres: ['комедия', 'боевик', 'фантастика'], video: '2D', duration: 110, 
    description: 'Дети величайших в мире секретных агентов невольно помогают могущественному разработчику игр выпустить компьютерный вирус, который дает ему контроль над всеми технологиями, в результате чего они сами становятся шпионами, чтобы спасти своих родителей и весь мир.',
    trailer: 'https://www.youtube.com/watch?v=8NkgQ0Odiew',
    schedule: [
        {
            date: '01.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 13, image: img13, title: 'Великая ирония', age: 16, language: 'RU', genres: ['мелодрама', 'триллер', 'драма'], video: '2D', duration: 100, 
    description: 'Осенний Париж всегда особенно романтичен. Словно по иронии судьбы, успешная, но несчастная в браке Фанни сталкивается там со своим одноклассником, которого не видела много лет. Вспоминая беззаботную юность в Нью-Йорке, она решается на роман с обаятельным писателем, который терял от неё голову ещё в школьные годы. Но когда ревнивый муж начинает что-то подозревать, невинная интрижка постепенно превращается в порочную игру, ставкой в которой может быть сама жизнь.',
    trailer: 'https://www.youtube.com/watch?v=LrBznZYVOLM',
    schedule: [
        {
            date: '01.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 14, image: img14, title: 'Великий уравнитель 3', age: 18, language: 'RU', genres: ['криминал', 'боевик', 'триллер'], video: '2D', duration: 115, 
    description: 'Покончив с работой тайного агента Роберт Макколл продолжает отстаивать правду в повседневной жизни и защищать тех, кто в этом нуждается. Находясь в Южной Италии он узнает, что его друзья оказались под влиянием местных криминальных авторитетов. Когда события обостряются, Макколл решает встать на защиту справедливости, вступив в борьбу с мафией.',
    trailer: 'https://www.youtube.com/watch?v=9miykCyQcmc',
    schedule: [
        {
            date: '01.10.2023',
            seances: [
            ]
        }
    ]},
    {id: 15, image: img15, title: 'Леди Баг и Супер-Кот: Пробуждение силы', age: 6, language: 'RU', genres: ['мультфильм', 'фэнтези', 'приключения'], video: '3D', duration: 110, 
    description: 'В обыкновенной французской школе учатся девочка Маринетт и её одноклассник Андриан, в которого она влюблена. Казалось бы, классическая история первой любви, но… Эти ребята — совсем не те, за кого себя выдают. Когда миру угрожает опасность, Маринетт превращается в супергероиню Леди Баг, а Адриан — в Супер-Кота. Их невероятные способности помогают бороться со злом, но при этом никто из них не знает, кто на самом деле скрывается под маской.',
    trailer: 'https://www.youtube.com/watch?v=rY2OLeGYsdU',
    schedule: [
        {
            date: '01.10.2023',
            seances: [
            ]
        }
    ]},
]
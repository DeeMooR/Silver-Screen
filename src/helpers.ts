import { format, addDays } from "date-fns";

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
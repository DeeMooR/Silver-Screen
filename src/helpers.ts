import { format, addDays } from "date-fns";
import { IDate } from "./interfaces";

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

export const getArrayDate = () => {
    const datesArray: IDate[] = [];
    let currentDate = new Date();

    for (let i = 0; i < 9; i++) {
        const dayOfWeek = arrDaysOfWeek[+currentDate.getDay()];
        const dateNumMonth = currentDate.getDate() + ' ' + russianMonths[currentDate.getMonth()];
        datesArray.push({ dayOfWeek, dateNumMonth });
        currentDate = addDays(currentDate, 1);
    }
    datesArray[0].dayOfWeek = 'сегодня';
    datesArray[1].dayOfWeek = 'завтра';

    return datesArray;
}

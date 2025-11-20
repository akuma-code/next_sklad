import dayjs from "dayjs";
import "dayjs/locale/ru";
import weekday from "dayjs/plugin/weekday";
dayjs.extend(weekday)

export const _formated_date = (date?: string | dayjs.Dayjs | null) =>
    dayjs(date, "YYYY-MM-DD", 'ru').format("YYYY-MM-DD");

export enum DayOfWeek {
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
}

export enum Month {
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
}

export const _dbDateParser = (date: string) => {
    dayjs.locale('ru')
    const obj = dayjs(date, "YYYY-MM-DD", "ru");
    const dd_mm_yyyy = obj.format("DD.MM.YYYY");
    const dd_mmmm = dayjs(date, "YYYY-MM-DD", "ru").format("DD MMMM");
    return { dd_mm_yyyy, dd_mmmm, _dayjs: obj };
};
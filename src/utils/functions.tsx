import { DAYS_PER_SEASON, DAYS_PER_YEAR, seasons } from "./constants"
import { CalendarBirthday, CalendarData, CalendarFestival, DateEvent } from "./types";

export const capitalizeString = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1); 
}

export const getYear = (dayNumber: number) => {
    return Math.floor((dayNumber - 1) / DAYS_PER_YEAR) + 1;
}

export const getSeason = (dayNumber: number) => {
    const seasonIndex = Math.floor(((dayNumber - 1) % DAYS_PER_YEAR) / DAYS_PER_SEASON);
    return seasons[seasonIndex];
}

export const getDay = (dayNumber: number) => {
    return ((dayNumber - 1) % DAYS_PER_SEASON) + 1;
}

export const dayCheck = (dayNumber: number, currentYear: number, currentSeason: string, currentDay: number) => {
    return ((getYear(dayNumber) === currentYear) && (getSeason(dayNumber) === currentSeason) && (getDay(dayNumber) === currentDay));
}

export const calculateDay = (year: number, season: number, day: number) => {
    return ((year) * 112) + (season * 28) + day;
}

export const filterEventsByDay = (
    birthdays: CalendarBirthday[], festivals: CalendarFestival[], events: CalendarData[], currentYear: number, currentSeason: string, currentDay: number
) => {
    const dayEvents = [];

    const birthdayList = birthdays.filter((birthday) => birthday.day === currentDay);
    const festivalList = festivals.filter((festival) => festival.day === currentDay);
    const eventList = events.filter((events) => dayCheck(events.day, currentYear, currentSeason, currentDay));

    if (eventList && eventList.length) {
        const mappedEvents = eventList.map((events) => ({
            id: events.id,
            type: events.type,
            name: events.name,
            note: events.note
        } as DateEvent));
        dayEvents.push(...mappedEvents);
    }
    if (birthdayList && birthdayList.length) {
        const mappedBirthdays = birthdayList.map((birthday) => ({
            id: null,
            type: "birthday",
            name: birthday.name,
            note: null
        } as DateEvent));
        dayEvents.push(...mappedBirthdays);
    }
    if (festivalList && festivalList.length) {
        const mappedFestivals = festivalList.map((festival) => ({
            id: null,
            type: `${festival.type}-festival`,
            name: festival.name,
            note: null
        } as DateEvent));
        dayEvents.push(...mappedFestivals);
    }

    return dayEvents;
}
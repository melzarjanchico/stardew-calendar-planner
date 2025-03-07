export type Season = "spring" | "summer" | "fall" | "winter";

export type CalendarBirthday = {
    day: number;
    name: string;
}

export type CalendarFestival = {
    day: number;
    name: string;
    type: string;
}

export type CalendarData = {
    id: string;
    day: number;
    type: string;
    name: string;
    note: string;
}

export type DateEvent = {
    id: string | null;
    type: string;
    name: string;
    note: string | null;
}
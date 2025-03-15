import { useEffect, useState } from "react";
import { daysOfTheWeek, events, festivalIcons, seasonWithIcons, villagerIcons } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faCaretLeft, faCaretRight, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import NewEventModal from "./modals/NewEvent";
import { capitalizeString, dayCheck, filterEventsByDay } from "../utils/functions";
import { CalendarBirthday, CalendarData, CalendarFestival, Season } from "../utils/types";
import ViewEventModal from "./modals/ViewEvent";

const Calendar = () => {
    // Selected variables
    const [year, setYear] = useState(0);
    const [season, setSeason] = useState<Season>("spring");
    const [day, setDay] = useState(1);

    // Modal toggles
    const [newEventModal, setNewEventModal] = useState(false);
    const [viewEventModal, setViewEventModal] = useState(false);

    // Birthday/festivals array states
    const [seasonBirthdays, setSeasonBirthdays] = useState<CalendarBirthday[]>([]);
    const [seasonFestivals, setSeasonFestivals] = useState<CalendarFestival[]>([]);

    // Events localStorage arrat state
    const [seasonEvents, setSeasonEvents] = useState<CalendarData[]>(() => {
        const stored = localStorage.getItem("calendar_data");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        if (season) {
            const birthdays = events[season].birthdays;
            const festivals = events[season].festivals;
            setSeasonBirthdays(birthdays);
            setSeasonFestivals(festivals);
        }
    }, [season])

    useEffect(() => {
        const handleStorageChange = () => {
            const updatedData = localStorage.getItem("calendar_data");
            setSeasonEvents(updatedData ? JSON.parse(updatedData) : []);
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const handleYearChange = (shouldIncrease: boolean) => {
        setYear(prevYear => prevYear + (shouldIncrease ? 1 : prevYear > 0 ? -1 : 0));
    }

    const handleSeasonChange = (newSeason: Season) => {
        setSeason(newSeason);
    }

    const addEvent = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, day: number) => {
        if (e) e.stopPropagation();
        setDay(day);
        setNewEventModal(true);
    }

    const viewEvent = (day: number) => {
        setDay(day);
        setViewEventModal(true);
    }

    const deleteEvent = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, id: string | null) => {
        if (!id) return;
        if (e) e.stopPropagation();
        setSeasonEvents((prevEvents) => {
            const updatedEvents = prevEvents.filter((event) => event.id !== id);
            localStorage.setItem("calendar_data", JSON.stringify(updatedEvents));
            return updatedEvents;
        });
    };

    const handleDayEvents = (day: number) => {
        const dayEvents = [];

        const birthdays = seasonBirthdays.filter((birthday) => birthday.day === day);
        const festivals = seasonFestivals.filter((festival) => festival.day === day);
        const events = seasonEvents.filter((events) => dayCheck(events.day, year+1, season, day));

        if (events && events.length) {
            const mappedEvents = events.map((events) => ({
                id: events.id,
                type: events.type,
                name: events.name,
            }));
            dayEvents.push(...mappedEvents);
        }
        if (birthdays && birthdays.length) {
            const mappedBirthdays = birthdays.map((birthday) => ({
                id: null,
                type: "birthday",
                name: birthday.name,
            }));
            dayEvents.push(...mappedBirthdays);
        }
        if (festivals && festivals.length) {
            const mappedFestivals = festivals.map((festival) => ({
                id: null,
                type: `${festival.type}-festival`,
                name: festival.name,
            }));
            dayEvents.push(...mappedFestivals);
        }

        return dayEvents;
    }

    const handleDayEventDisplay = (day: number) => {
        return (
            <div className="flex flex-col gap-0.5 p-2 text-sm">
                {handleDayEvents(day+1)
                    .slice(0, 4)
                    .map((events) => {
                    if (events.type === "birthday") {
                        const villagerIcon = villagerIcons(events.name);
                        return (
                            <div key={events.name} className="p-0.5 rounded flex flex-row items-center hover:bg-zinc-500/10" title={`${events.name}'s Birthday`}>
                                <div className="basis-1/5 pe-1">
                                    <img 
                                        src={villagerIcon ? villagerIcon.icon : ""}
                                        className="max-w-5"
                                    />
                                </div>
                                <div className="basis-4/5 flex flex-row items-center justify-between w-full min-w-0">
                                    <div className="truncate w-full">
                                    {events.name}'s Birthday
                                    </div>
                                </div>
                            </div>
                        )
                    } else if (events.type.includes("festival")) {
                        return (
                            <div key={events.name} className="p-0.5 rounded flex flex-row items-center hover:bg-zinc-500/10" title={events.name}>
                                <div className="basis-1/5 pe-1">
                                    <img 
                                        src={festivalIcons(events.type)}
                                        className="max-w-5"
                                    />
                                </div>
                                <div className="basis-4/5 flex flex-row items-center justify-between w-full min-w-0">
                                    <div className="truncate w-full">
                                        {events.name}
                                    </div>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div key={`${events.id}-${events.name}`} className="p-0.5 rounded flex flex-row items-center hover:bg-zinc-500/10 group/event" title={events.name}>
                                <div className="basis-1/5 pe-1">
                                    <div className="w-[20px]">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="w-[20px] h-[20px]"/>
                                    </div>
                                </div>
                                <div className="basis-4/5 group-hover/event:basis-3/5 flex flex-row items-center justify-between w-full min-w-0">
                                    <div className="truncate w-full">
                                        {events.name}
                                    </div>
                                </div>
                                <div className="hidden group-hover/event:block basis-1/5 ps-px">
                                    <button 
                                        onClick={(e) => deleteEvent(e, events.id)}
                                        className="ml-2 text-zinc-500 hover:text-red-500 cursor-pointer"
                                    >
                                        <FontAwesomeIcon icon={faTimes} className="w-[16px] h-[16px]" />
                                    </button>
                                </div>
                            </div>
                        )
                    }
                })}
                {/* Show +X more if there are more than 5 events */}
                {handleDayEvents(day + 1).length > 4 && (
                    <div className="text-xs text-gray-500 ps-1.5">+{handleDayEvents(day + 1).length - 4} more</div>
                )}
            </div>
        )
    }

    const handleDayEventDisplaySmall = (day: number) => {
        return (
            <div className="flex flex-col gap-0.5 p-2">
                {handleDayEvents(day + 1)
                    .slice(0, 1)
                    .map((events, index) => {
                        if (events.type === "birthday") {
                            const villagerIcon = villagerIcons(events.name);
                            return (
                                <div key={index} className="flex w-6 h-6 items-center justify-center">
                                    <img 
                                        src={villagerIcon ? villagerIcon.icon : ""} 
                                        className="w-full h-full object-cover rounded-md"
                                        alt={events.name}
                                    />
                                </div>
                            );
                        } else if (events.type.includes("festival")) {
                            return (
                                <div key={index} className="flex w-6 h-6 items-center justify-center">
                                    <img 
                                        src={festivalIcons(events.type)} 
                                        className="w-full h-full object-cover rounded-md"
                                        alt={events.type}
                                    />
                                </div>
                            );
                        } else {
                            return (
                                <div key={index} className="flex w-6 h-6 items-center justify-center">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="w-full h-full" />
                                </div>
                            );
                        }
                    })}
                {handleDayEvents(day + 1).length > 1 && (
                    <div className="text-gray-500 truncate text-[10px] tracking-[-0.5px]">
                        +{handleDayEvents(day + 1).length - 1} more
                    </div>
                )}
            </div>
        );
    };

    const hasPlayerMadeEvents = (day: number) => {
        return handleDayEvents(day + 1).filter((playerEvent) => playerEvent.type !== "birthday" && !playerEvent.type.includes("festival")).length > 0;
    }
    
    
    return (
        <>
            <div className="flex flex-col py-8 px-4 sm:px-8">

                {/* Header */}
                <div className="flex flex-col flex-wrap gap-x-3 gap-y-1 select-none mb-1 sm:w-full sm:flex-row">
                    <div className="flex flex-row h-10 w-full header-border-image text-zinc-900 font-semibold flex items-center justify-between sm:w-64 px-2">
                        <button className="w-8 cursor-pointer shrink" onClick={() => handleYearChange(false)}>
                            <FontAwesomeIcon icon={faCaretLeft}/>
                        </button>
                        <div className="flex-1 w-0 flex justify-center">
                            <span className="truncate text-lg">Year {year+1}, {capitalizeString(season)}</span>
                        </div>
                        <button className="w-8 cursor-pointer shrink" onClick={() => handleYearChange(true)}>
                            <FontAwesomeIcon icon={faCaretRight}/>
                        </button>
                    </div>
                    <div className="flex flex-row gap-2">
                        <div className="h-10 flex flex-row shrink gap-0.5">
                            {seasonWithIcons.map((item) => {
                                return (
                                    <button
                                        key={item.name}
                                        title={capitalizeString(item.name)}
                                        className="text-zinc-900 border-2 border-secondary rounded flex flex-col items-center justify-center"
                                        onClick={() => handleSeasonChange(item.name as Season)}
                                    >
                                        <img 
                                            src={item.icon}
                                            className={`cursor-pointer w-full h-full object-cover ${(season === item.name) ? "" : "opacity-40"}`}
                                        />
                                    </button>
                                )
                            })}
                        </div>
                        <button 
                            className="h-10 aspect-square bg-primary text-zinc-900 border-2 border-secondary rounded flex items-center justify-center font-semibold text-xl cursor-pointer"
                            onClick={() => addEvent(null, 1)}>
                            <FontAwesomeIcon icon={faPlus}/>
                        </button>
                    </div>
                </div>

                {/* Calendar */}
                <div className="select-none">
                    <div className="calendar-border-image">
                        <div className="grid grid-cols-[repeat(7,minmax(0,11rem))]">
                            {
                                Array.from(daysOfTheWeek, (day) => (
                                    <div 
                                        key={day} 
                                        className="max-w-44 border border-secondary bg-primary-light font-bold text-zinc-900 text-center py-2 text-xs sm:text-base"
                                    >
                                        {day}
                                    </div>
                                ))
                            }
                            {
                                Array.from(Array(28), (_, i) => (
                                    <div 
                                        key={i} 
                                        onClick={() => viewEvent(i+1)}
                                        className="relative h-22 sm:max-w-44 sm:h-44 sm:aspect-auto border border-secondary bg-primary/90 text-zinc-900 cursor-pointer hover:inset-shadow-sm hover:inset-shadow-black/20 group"
                                    >
                                        <div className="flex justify-between items-center relative">
                                            {/* Day Number Container */}
                                            <div 
                                                onClick={(e) => e.stopPropagation()}
                                                className="relative w-6 h-6 text-xs border-b-2 border-e-2 border-secondary bg-primary-light flex items-center justify-center font-semibold cursor-default sm:w-8 sm:h-8 sm:text-sm"
                                            >
                                                {/* Top-Right Ping Animation */}
                                                {hasPlayerMadeEvents(i) &&
                                                    <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 flex size-3 z-50 pointer-events-none">
                                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                                                        <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
                                                    </span>
                                                }

                                                {i + 1}
                                            </div>

                                            {/* Add Event Button */}
                                            <button 
                                                title={`Add event for Year ${year+1}, ${capitalizeString(season)} ${i+1}`}
                                                className="me-2 hidden group-hover:flex group-hover:transition-discrete items-center justify-center hover:bg-zinc-500/30 rounded cursor-pointer"
                                                onClick={(e) => addEvent(e, i+1)}
                                            >
                                                <FontAwesomeIcon icon={faPlus} className="text-xs p-0.75 sm:p-1 sm:text-sm"/>
                                            </button>
                                        </div>

                                        <div className="hidden sm:block">
                                            {handleDayEventDisplay(i)}
                                        </div>
                                        <div className="block sm:hidden">
                                            {handleDayEventDisplaySmall(i)}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="text-xs font-semibold drop-shadow-[0_0_2px_black] mt-1">
                        <a href="https://www.stardewvalley.net/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                            Stardew Valley
                        </a> 
                        {" (v1.6) ©"}
                        <a href="https://twitter.com/ConcernedApe" target="_blank" rel="noopener noreferrer" className="hover:underline">
                            ConcernedApe
                        </a>
                        {". Made with ❤️ by "}
                        <a href="https://github.com/melzarjanchico" target="_blank" rel="noopener noreferrer" className="hover:underline">
                            melzarjanchico
                        </a>
                        .
                    </div>
                </div>
            </div>

            {newEventModal &&
                <NewEventModal 
                    closeBtn={() => setNewEventModal(false)}
                    defaultDay={day}
                    defaultSeason={season}
                    defaultYear={year+1}
                />
            }

            {viewEventModal &&
                <ViewEventModal
                    closeBtn={() => setViewEventModal(false)}
                    day={day}
                    season={season}
                    year={year+1}
                    eventList={filterEventsByDay(seasonBirthdays, seasonFestivals, seasonEvents, year+1, season, day)}
                    deleteEvent={deleteEvent}
                />
            }

        </>
    )
}

export default Calendar;
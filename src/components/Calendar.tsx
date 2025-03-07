import { useEffect, useState } from "react";
import { daysOfTheWeek, events, festivalIcons, seasonWithIcons, villagerIcons } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faCaretDown, faCaretUp, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
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
                            <div key={events.name} className="p-0.5 rounded flex flex-row items-center">
                                <div className="basis-1/5 pe-1">
                                    <img 
                                        src={villagerIcon ? villagerIcon.icon : ""}
                                        className="max-w-5"
                                    />
                                </div>
                                <span className="basis-4/5 overflow-hidden truncate w-full block">{events.name}'s Birthday</span>
                            </div>
                        )
                    } else if (events.type.includes("festival")) {
                        return (
                            <div key={events.name} className="p-0.5 rounded flex flex-row items-center">
                                <div className="basis-1/5 pe-1">
                                    <img 
                                        src={festivalIcons(events.type)}
                                        className="max-w-5"
                                    />
                                </div>
                                <div className="basis-4/5 overflow-hidden truncate w-full block">{events.name}</div>
                            </div>
                        )
                    } else {
                        return (
                            <div key={`${events.id}-${events.name}`} className="p-0.5 rounded flex flex-row items-center hover:bg-zinc-500/10 group/event">

                                <div className="basis-1/5 pe-1">
                                    <div className="w-[20px]">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="w-[20px] h-[20px]"/>
                                    </div>
                                </div>

                                {/* Unhovered view */}
                                <span className="basis-4/5 overflow-hidden truncate w-full block group-hover/event:hidden">
                                    {events.name}
                                </span>

                                {/* Hovered View */}
                                <div className="basis-4/5 hidden group-hover/event:grid grid-cols-4 items-center justify-between">
                                    <span className="col-span-3 overflow-hidden text-ellipsis whitespace-nowrap">{events.name}</span>
                                    <button 
                                        onClick={(e) => deleteEvent(e, events.id)}
                                        className="col-span-1 ml-2 text-zinc-500 hover:text-red-500 cursor-pointer"
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
                    <div className="text-xs text-gray-500">+{handleDayEvents(day + 1).length - 4} more</div>
                )}
            </div>
        )
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
    
    return (
        <>
            <div className="flex flex-row">

                <div className="flex flex-col gap-3 pe-2 select-none">
                    <div 
                        className="bg-primary text-zinc-900 border-2 border-secondary rounded flex items-center justify-center font-semibold text-xl aspect-square cursor-pointer"
                        onClick={() => addEvent(null, 1)}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </div>

                    <div>
                        <div className="text-xs font-bold drop-shadow-[0_0_2px_black]">YEAR</div>
                        <div className="bg-primary text-zinc-900 border-2 border-secondary w-14 rounded flex flex-col items-center justify-center font-semibold text-xl">
                            <button className="w-full py-1 cursor-pointer" onClick={() => handleYearChange(true)}>
                                <FontAwesomeIcon icon={faCaretUp}/>
                            </button>
                            {year+1}
                            <button className="w-full py-1 cursor-pointer" onClick={() => handleYearChange(false)}>
                                <FontAwesomeIcon icon={faCaretDown}/>
                            </button>
                        </div>
                    </div>

                    <div>
                        <div className="text-xs font-bold drop-shadow-[0_0_2px_black]">SEASON</div>
                        <div className="flex flex-col gap-0.5">
                            {seasonWithIcons.map((item) => {
                                return (
                                    <div 
                                        key={item.name}
                                        className="text-zinc-900 border-2 border-secondary w-14 rounded flex flex-col items-center justify-center"
                                        onClick={() => handleSeasonChange(item.name as Season)}
                                    >
                                        <img 
                                            src={item.icon}
                                            className={`cursor-pointer w-full h-full object-cover ${(season === item.name) ? "" : "opacity-40"}`}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className="select-none">
                    <div className="grid grid-cols-[repeat(7,minmax(0,12rem))] border border-secondary">
                        {
                            Array.from(daysOfTheWeek, (day) => {
                                return (
                                    <div key={day} className="max-w-48 min-w-9 border border-secondary bg-primary-light font-bold text-zinc-900 text-center py-2">
                                        {day}
                                    </div>
                                )
                            })
                        }
                        {
                            Array.from(Array(28), (_, i) => {
                                return (
                                    <div key={i} 
                                        onClick={() => viewEvent(i+1)}
                                        className="max-w-48 min-w-9 h-44 border border-secondary bg-primary/90 text-zinc-900 cursor-pointer hover:inset-shadow-sm hover:inset-shadow-black/20 group"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="w-8 h-8 border-b-2 border-e-2 border-secondary bg-primary-light flex items-center justify-center font-semibold cursor-default">
                                                {i+1}
                                            </div>
                                            <button 
                                                title={`Add event for Year ${year+1}, ${capitalizeString(season)} ${i+1}`}
                                                className="me-2 hidden group-hover:flex group-hover:transition-discrete items-center justify-center hover:bg-zinc-500/30 rounded cursor-pointer"
                                                onClick={(e) => addEvent(e, i+1)}
                                            >
                                                <FontAwesomeIcon icon={faPlus} className="text-sm p-1"/>
                                            </button>
                                        </div>
                                        {handleDayEventDisplay(i)}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <span className="text-xs font-semibold drop-shadow-[0_0_2px_black]">
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
                    </span>
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
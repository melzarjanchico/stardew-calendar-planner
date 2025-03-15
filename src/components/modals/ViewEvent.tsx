import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClose, faTimes } from "@fortawesome/free-solid-svg-icons";
import { capitalizeString } from "../../utils/functions";
import { DateEvent } from "../../utils/types";
import { festivalIcons, seasonWithIcons, villagerIcons } from "../../utils/constants";
import { useState } from "react";
import NewEventModal from "./NewEvent";

type Props = {
    closeBtn: () => void;
    day: number;
    season: string;
    year: number;
    eventList: DateEvent[];
    deleteEvent: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, id: string | null) => void;
};

const ViewEventModal = ({ closeBtn, day, season, year, eventList, deleteEvent }: Props) => {
    const [newEventModal, setNewEventModal] = useState(false);

    const closeBtnHandler = () => {
        closeBtn();
    };

    const nameHandler = (event: DateEvent) => {
        return (event.type === "birthday") ? `${event.name}'s Birthday` : event.name;
    }

    const nonEventChecker = (event: DateEvent) => {
        return event.type === "birthday" || event.type.includes("festival");
    }

    const iconHandler = (event: DateEvent) => {
        if (event.type === "birthday") {
            const villagerIcon = villagerIcons(event.name);
            return <img 
                src={villagerIcon ? villagerIcon.icon : ""}
                className="w-[30px] h-[30px]"
            />
        } else if (event.type.includes("festival")) {
            return <img 
                src={festivalIcons(event.type)}
                className="w-[30px] h-[30px]"
            />
        } else {
            return <div className="w-[30px] h-[30px] flex items-center justify-center">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-[30px]"/>
            </div>
        }
    }

    return (
        <>
            <div
                tabIndex={-1}
                className="fixed top-0 right-0 left-0 z-50 h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-x-hidden overflow-y-auto select-none md:inset-0">

                {/* Modal Overlay */}
                <div className="bg-black/50 fixed inset-0 bg-black"></div>

                <div className="fixed inset-0 flex flex-col items-center justify-center p-8">
                    <div className="relative w-full max-w-3xl">
                        <div className="flex justify-end mb-1.5">
                            <button
                                type="button"
                                className="flex w-8 aspect-square items-center justify-center bg-primary-light text-red-500 cursor-pointer border-2 border-secondary rounded"
                                onClick={closeBtnHandler}>
                                    <FontAwesomeIcon className="text-2xl" icon={faClose} />
                            </button>
                        </div>

                        <div className="bg-primary-light shadow-lg modal-border-image">
                            {/* Modal Header */}
                            <div className="p-5">
                            </div>

                            {/* Modal Body */}
                            <div className="flex flex-col px-10 text-zinc-950 gap-2">
                                <div className="flex flex-row gap-2">
                                    <div>
                                        <img className="rounded border-2 border-secondary" src={seasonWithIcons.find((seasonWithIcon) => seasonWithIcon.name === season)?.icon}/>
                                    </div>
                                    <div className="mb-4 text-3xl font-semibold">
                                        Year {year}, {capitalizeString(season)} {day}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1 max-h-72 overflow-y-auto scrollbar-thin">
                                    {eventList.map((event) => {
                                        const id = event.id ? `${event.id}-${event.name}` : event.name;
                                        return (
                                            <div key={id} className={`group flex gap-4 py-1 px-2 mx-2 rounded hover:bg-zinc-500/10 ${nonEventChecker(event) ? "py-2.5" : ""}`}>
                                                <div className="shrink-0">
                                                    {iconHandler(event)}
                                                </div>
                                                <div className="flex flex-col w-full">
                                                    <div className="text-lg font-semibold">
                                                        {nameHandler(event)}
                                                    </div>
                                                    <div>
                                                        {event.note}
                                                    </div>
                                                </div>
                                                {!nonEventChecker(event) &&
                                                    <div className="hidden group-hover:flex px-2 items-center">
                                                        <button 
                                                            className="cursor-pointer"
                                                            onClick={(e) => deleteEvent(e, event.id)}
                                                        >
                                                            <FontAwesomeIcon icon={faTimes}/>
                                                        </button>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })}
                                    {!eventList.length &&
                                        <div className="text-zinc-500 italic">
                                            There are no events in this day.
                                        </div>
                                    }
                                </div>

                            </div>

                            {/* Modal Footer */}
                            <div className="px-10 py-8 flex justify-end gap-1">
                                <button className="border text-black font-bold px-3 py-1 cursor-pointer hover:bg-primary/30" onClick={closeBtnHandler}>Cancel</button>
                                <button className="border text-black font-bold px-3 py-1 cursor-pointer hover:bg-primary/30" onClick={() => setNewEventModal(true)}>Add Event</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {newEventModal &&
                <NewEventModal 
                    closeBtn={() => setNewEventModal(false)}
                    defaultDay={day}
                    defaultSeason={season}
                    defaultYear={year}
                />
            }

        </>
    );
};

export default ViewEventModal;
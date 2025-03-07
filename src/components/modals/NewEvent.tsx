import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { seasons, seasonWithIcons } from "../../utils/constants";
import { CalendarData } from "../../utils/types";
import { calculateDay } from "../../utils/functions";

type Props = {
    closeBtn: () => void;
    defaultYear?: number;
    defaultSeason?: string;
    defaultDay?: number;
};

const NewEventModal = ({ closeBtn, defaultYear, defaultSeason, defaultDay }: Props) => {
    const [newTitle, setNewTitle] = useState("");
    const [newNote, setNewNote] = useState("");

    const [season, setSeason] = useState("spring");
    const [day, setDay] = useState(1);
    const [year, setYear] = useState(1);

    useEffect(() => {
        if (defaultYear && defaultSeason && defaultDay) {
            setYear(defaultYear);
            setSeason(defaultSeason);
            setDay(defaultDay);
        }
    }, [defaultYear, defaultSeason, defaultDay])

    const closeBtnHandler = () => {
        closeBtn();
    };

    const submitHandler = () => {
        try {
            const storedData = localStorage.getItem("calendar_data");
            const calendarData: CalendarData[] = storedData ? JSON.parse(storedData) : [];
    
            const indexOfSeason = seasons.indexOf(season);
            const newEvent: CalendarData = {
                id: crypto.randomUUID(),
                day: calculateDay(year-1, indexOfSeason, day),
                type: newNote,
                name: newTitle,
                note: newNote
            };
    
            const updatedCalendarData = [...calendarData, newEvent];
            localStorage.setItem("calendar_data", JSON.stringify(updatedCalendarData));
    
            // Manually dispatch a storage event to notify other components
            window.dispatchEvent(new Event("storage"));
    
            closeBtn();
        } catch (error) {
            console.error("Failed to update calendar data:", error);
        }
    };

    return (
        <>
            <div
                tabIndex={-1}
                className="fixed top-0 right-0 left-0 z-50 h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-x-hidden overflow-y-auto select-none md:inset-0">

                {/* Modal Overlay */}
                <div className="bg-black/40 fixed inset-0 bg-black"></div>

                <div className="fixed inset-0 flex items-center justify-center p-8">
                    <div className="relative w-full max-w-2xl rounded-xl bg-white shadow-lg">

                        {/* Modal Header */}
                        <div className="flex items-center justify-end rounded-t-xl px-5 py-5">
                            <button
                                type="button"
                                className={`flex h-6 w-6 items-center justify-center rounded-lg bg-transparent text-gray-800 cursor-pointer hover:bg-gray-200 hover:text-gray-900`}
                                onClick={closeBtnHandler}>
                                    <FontAwesomeIcon className="text-2xl" icon={faClose} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex flex-col px-10 text-zinc-950 gap-2">
                            <div className="mb-2 text-2xl font-semibold">
                                ADD AN EVENT
                            </div>
                            <div className="flex flex-row gap-1">
                                <div className="flex flex-col font-bold">
                                    <label className="text-sm">YEAR</label>
                                    <input type="number" id="yearInput" min="1" max="9999" defaultValue={defaultYear ?? 1} className="border p-1 font-normal min-h-9" onChange={(e) => setYear(Number(e.target.value))}/>
                                </div>
                                <div className="flex flex-col font-bold">
                                    <label className="text-sm">SEASON</label>
                                    <select 
                                        id="season" name="seasonSelect" 
                                        className="border p-1 font-normal min-h-9" 
                                        defaultValue={defaultSeason ?? "spring"}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSeason(e.target.value)}
                                    >
                                        {seasonWithIcons.map((season) => {
                                            return (<option key={season.name} value={season.name}>
                                                {season.name.toUpperCase()}
                                            </option>)
                                        })}
                                    </select>
                                </div>
                                <div className="flex flex-col font-bold">
                                    <label className="text-sm">DAY</label>
                                    <input type="number" id="daysInput" min="1" max="28" defaultValue={defaultDay ?? 1} className="border p-1 font-normal min-h-9" onChange={(e) => setDay(Number(e.target.value))}/>
                                </div>
                            </div>
                            <div>
                                <div className="font-bold text-sm">TITLE</div>
                                <input id="title" className="border p-1 w-full" onChange={(e) => setNewTitle(e.target.value)}></input>
                            </div>
                            <div>
                                <div className="font-bold text-sm">NOTE</div>
                                <textarea id="note" className="border resize-none p-1 w-full" rows={3} onChange={(e) => setNewNote(e.target.value)}/>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-10 py-8 flex justify-end gap-1">
                            <button className="border text-black font-bold px-3 py-1 cursor-pointer hover:bg-primary/30" onClick={closeBtnHandler}>Cancel</button>
                            <button className="border text-black font-bold px-3 py-1 cursor-pointer bg-primary/80 hover:bg-primary" onClick={submitHandler}>Create</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default NewEventModal;
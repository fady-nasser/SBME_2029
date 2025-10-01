import React, { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import useCachedCSV from "./utils/useCachedCSV";

const Schedule = () => {
    const [slots, setSlots] = useState([]);
    const containerRef = useRef(null);
    // const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     setLoading(true);
    //     Papa.parse("https://docs.google.com/spreadsheets/d/1JZYv5gQYE7LSgoOPGAYFCYBuWYCeI9RLge32EOdgn_k/export?format=csv", {
    //         download: true,
    //         header: true,
    //         complete: (result) => {
    //             const today = "Monday";
    //             const todaySlots = result.data.filter((row) => row.Day === today);
    //             setSlots(todaySlots);
    //             setLoading(false);
    //         },
    //     });
    // }, []);

    const CSV_URL = "https://docs.google.com/spreadsheets/d/1JZYv5gQYE7LSgoOPGAYFCYBuWYCeI9RLge32EOdgn_k/export?format=csv"
    const { data, loading, error, lastUpdated } = useCachedCSV(CSV_URL, {
      cacheKey: "schedule",
    });
    
    // console.log("ahhhh" + data + "a" + new Date().toLocaleDateString("en-US", {weekday: "long"}));
    useEffect(() =>{
        if((data||[]).length > 0)
        {
            const today = new Date().toLocaleDateString("en-US", {weekday: "long"});
            // const today = "Monday"
            const todaySlots = data.filter((row) => row.Day === today);
            setSlots(todaySlots);
        }
    }, [data])


    const getCurrentTimeMinutes = () => {
        const now = new Date();
        return now.getHours() * 60 + now.getMinutes();
    };

    // Get schedule start and end
    const getScheduleBounds = () => {
        if (slots.length === 0) return [0, 0];
        const start = Math.min(...slots.map(slot => {
            const [h, m] = slot.StartTime.split(":").map(Number);
            return h * 60 + m;
        }));
        const end = Math.max(...slots.map(slot => {
            const [h, m] = slot.EndTime.split(":").map(Number);
            return h * 60 + m;
        }));
        return [start, end];
    };
    const getSlotDuration = (slot) => {
        const [startH, startM] = slot.StartTime.split(":").map(Number);
        const [endH, endM] = slot.EndTime.split(":").map(Number);
        return (endH * 60 + endM) - (startH * 60 + startM);
    };

    let minDuration = Math.min(...slots.map(getSlotDuration));
    const currentMinutes = getCurrentTimeMinutes();
    const [scheduleStart, scheduleEnd] = getScheduleBounds();
    const totalDuration = scheduleEnd - scheduleStart;

    // Calculate bar position as a percentage
    let barLeftPercent = 0;
    if (totalDuration > 0) {
        barLeftPercent = ((currentMinutes - scheduleStart) / totalDuration) * 100;
        barLeftPercent = Math.max(0, Math.min(barLeftPercent, 100));
    }

    return (
        <div style={{width: "100%", overflowX: "auto"}}>
                    <div
            className="schedule-container"
            style={{
                display: "flex",
                overflowX: "hidden",
                position: "relative",
                paddingBottom: "20px",
                minHeight: "180px",
                width: "fit-content"
            }}
            ref={containerRef}
        >
            {data?(
            <>
                        {slots.length > 0 && (
                <>
                    <div
                        style={{
                            position: "absolute",
                                        top: 0,
                                        bottom: 0,
                                        left: containerRef.current
                                ? `${(barLeftPercent / 100) * containerRef.current.offsetWidth}px`
                                : `calc(${barLeftPercent}% )`,
                                        width: "4px",
                                        background: "var(--theme-color)",
                                        zIndex: 2,
                                        pointerEvents: "none",
                                        transition: "left 0.5s linear"
                                    }}
                                />
                                {/* Circle at the top of the bar */}
                                <div style={{visibility: "hidden", overflow: "hidden", width: 0}}>{containerRef.current.offsetWidth}</div>
                                
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "0px",
                                        left: containerRef.current
                                ? `${(barLeftPercent / 100) * containerRef.current.offsetWidth - 6}px`
                                : `calc(${barLeftPercent}% - 6px )`,
                                        width: "16px",
                                        height: "16px",
                                        background: "var(--theme-color)",
                                        borderRadius: "50%",
                                        zIndex: 100,
                                        pointerEvents: "none",
                                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
                                    }}
                                />
                            </>
                        )}


                        {slots.map((slot, index) => {
                const start = parseInt(slot.StartTime.split(":")[0]) * 60 + parseInt(slot.StartTime.split(":")[1]);
                const end = parseInt(slot.EndTime.split(":")[0]) * 60 + parseInt(slot.EndTime.split(":")[1]);
                const isCurrent = currentMinutes >= start && currentMinutes <= end;

                return (
                    
                    <div
                        key={index}
                        style={{
                            minWidth: "200px",
                            border: "2px solid var(--theme-color)",
                            borderRadius: "20px",
                            margin: "5px",
                            marginTop: "20px",
                            padding: "10px",
                            backgroundColor: isCurrent ? "#fff" : "var(--theme-color)",
                            color: isCurrent ? "var(--theme-color)" : "#fff",
                            position: "relative",
                            zIndex: 1,
                            width: `${(getSlotDuration(slot) / minDuration) * 200}px`,
                        }}
                    >
                        <h4>{slot.Title || "Gap"}</h4>
                        <p>{slot.Type}</p>
                        <p>{slot.Hall}</p>
                        <p>
                            {slot.StartTime} - {slot.EndTime}
                        </p>
                    </div>
                );
            })}
            </>





            ):( !loading && <p>No data found</p>)}
            {/* Vertical time bar */}


        </div>
        </div>

    );
};

export default Schedule;

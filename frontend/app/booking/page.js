'use client';

import { Calendar } from "./Calendar";
import { EventToday } from "./EventToday";

import { useState, useRef, useEffect } from "react";

import td from "./db/TestData";


function Bmd() {
    const now = new Date(Date.now());
    const [selectedTs, setSelectedTs] = useState((new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)).getTime());
    // const [data, setData] = useState('null-data');
    const [eventToday, setEventToday] = useState(td.eventToday);
    const [eventTodayDb, setEventTodayDb] = useState(td.eventTodayDb);


    const fetchEventToday = (selectedTs) => {
        fetch('/api/test/today_events', {
            method: 'POST',
            body: JSON.stringify({
                selectedTs: selectedTs
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.condition === 'success') {
                    let _eventToday = data.eventToday;
                    let _eventTodayDb = data.eventTodayDb;
    
                    for (let i=0; i<_eventToday.length; i++) {
                        _eventToday[i].start_ts = new Date(_eventToday[i].start_ts);
                        _eventToday[i].end_ts = new Date(_eventToday[i].end_ts);
                        // console.log(_eventToday[i]);
                    }
    
                    for (let i=0; i<_eventTodayDb.length; i++) {
                        _eventTodayDb[i].start_ts = new Date(_eventTodayDb[i].start_ts);
                        _eventTodayDb[i].end_ts = new Date(_eventTodayDb[i].end_ts);
                    }
    
                    setEventToday(_eventToday);
                    setEventTodayDb(_eventTodayDb);
                    // console.log(eventToday, eventTodayDb);
                } else {
                    console.log(data.condition);
                }
            })
    }


    useEffect(() => {
        fetchEventToday(selectedTs);
    }, [selectedTs]);



    return <>
        <div className="flex flex-row items-center justify-center w-screen h-screen space-x-20 bg-white">
            <div className="flex flex-col w-96 h-screen items-center justify-center space-y-4 border">
                <EventToday eventToday={eventToday} eventTodayDb={eventTodayDb} selectedTs={selectedTs} />
            </div>

            <div className="relative w-96 h-96 border">
                <Calendar selectedTs={selectedTs} setSelectedTs={setSelectedTs} />
            </div>

            {/* <div className="w-96 h-96 border">
                <h1>{ (new Date(selectedTs)).toUTCString() }</h1>
            </div> */}
        </div>
    </>;
}

export default Bmd;
'use client';

import { Calendar } from "./Calendar";
import { EventToday } from "./EventToday";

import { useState, useRef } from "react";

import td from "./db/TestData";


function Bmd() {
    const [selectedTs, setSelectedTs] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+1));
    const [data, setData] = useState('null-data');
    const [eventToday, setEventToday] = useState(td.eventToday);
    const [eventTodayDb, setEventTodayDb] = useState(td.eventTodayDb);


    const fetchEventToday = () => {
        fetch('/api/test/today_events')
            .then(res => res.json())
            .then(data => {
                // console.log(data);

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
                console.log(eventToday, eventTodayDb);
            })
    }


    return <>
        <div className="flex flex-row items-center justify-center w-screen space-x-20">
            <div className="flex flex-col w-96 h-screen items-center justify-center space-y-4">
                <EventToday eventToday={eventToday} eventTodayDb={eventTodayDb} />
            </div>
            <div className="flex flex-col flex-shrink-0 w-96 h-96 items-center justify-center space-y-4 border-2">
                <Calendar selectedTs={selectedTs} setSelectedTs={setSelectedTs} />
            </div>
            <button onClick={fetchEventToday}>HAhaha</button>
        </div>
    </>;
}

export default Bmd;
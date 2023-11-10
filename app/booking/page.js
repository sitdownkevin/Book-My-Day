'use client';

import { Calendar } from "./Calendar";
import { EventToday } from "./EventToday";

import { useState } from "react";



function About() {
    const [selectedTs, setSelectedTs] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+1));


    return <>
        <div className="flex flex-row items-center justify-center w-screen space-x-20">
            <div className="flex flex-col w-96 h-screen items-center justify-center space-y-4">
                <EventToday selectedTs={selectedTs}/>
            </div>
            <div className="flex flex-col flex-shrink-0 w-96 h-96 items-center justify-center space-y-4 border-2">
                <Calendar selectedTs={selectedTs} setSelectedTs={setSelectedTs} />
            </div>
        </div>
    </>;
}

export default About;
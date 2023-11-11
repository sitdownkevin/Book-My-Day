'use client'

import { useState } from "react";

function Count() {
    const [num, setNum] = useState(0);
    const modeToggle = function () {
        const targetHtml = document.getElementsByName('html');
        console.log(targetHtml.className);
        targetHtml.className['dark'] = targetHtml.className['dark']? undefined : 'dark';
    }

    return (
        <>
            <div className="text-3xl text-white dark:text-black">{num}</div>
            <div className="flex flex-row space-x-4">
                <button 
                    className="bg-white text-black dark:text-white px-4 py-2 rounded-lg font-serif"
                    onClick={() => setNum(num + 1)}
                >Click</button>
                <button 
                    className="bg-white text-emerald-600 px-4 py-2 rounded-lg font-serif"
                    onClick={() => setNum(0)}
                >Reset</button>
            </div>
            <button className="px-4 py-2 rounded-lg font-serif text-white bg-emerald-600"
                onClick={modeToggle}
            >Display Mode</button>
        </>
    );
}

export { Count };
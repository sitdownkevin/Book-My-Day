'use client';

import { useState, useEffect } from "react";

function Month({ _month, setMonth, setIsMonthOpen }) {
    const months = Array.from(
        { length: 12 },
        (_, i) => ({ id: i, val: 1 + i })
    );

    return <>
        <div className="origin-top-right rounded shadow ">
            <div className="bg-white max-h-48 overflow-y-auto">
                {months.map(month => {
                    return <>
                        <a className={`block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white ${month.val === _month ? 'bg-indigo-500 text-white' : ''}`} key={month.id}
                            onClick={() => {
                                setMonth(month.val);
                                setIsMonthOpen(false);
                            }}
                        >
                            {month.val}
                        </a>
                    </>
                })}
            </div>
        </div>
    </>;
}


function Year({ _year, setYear, setIsYearOpen }) {
    const years = Array.from(
        { length: 6 },
        (_, i) => ({ id: i, val: 2018 + i })
    );


    return <>
        <div className="origin-top-right rounded shadow">
            <div className="bg-white max-h-48 overflow-y-auto">
                {years.map(year => {
                    return <>
                        <a className={`block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white ${year.val === _year ? 'bg-indigo-500 text-white' : ''}`} key={year.id}
                            onClick={() => {
                                setYear(year.val);
                                setIsYearOpen(false);
                            }}
                        >
                            {year.val}
                        </a>
                    </>
                })}
            </div>
        </div>
    </>;
}


function Menu({ year, setYear, month, setMonth }) {
    const [isYearOpen, setIsYearOpen] = useState(false);
    const [isMonthOpen, setIsMonthOpen] = useState(false);

    return <>
        <div className="bg-white w-70 h-8 flex flex-row">
            <div className="relative flex flex-col w-24">
                <button
                    className="inline-flex items-center px-4 py-2 text-gray-500 bg-white rounded hover:bg-gray-100"
                    onClick={() => { setIsYearOpen(!isYearOpen); setIsMonthOpen(false); }}
                >
                    {year}
                    <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                {isYearOpen && <Year _year={year} setYear={setYear} setIsYearOpen={setIsYearOpen}/>}
            </div>

            <div className="relative flex flex-col w-20">
                <button
                    className="inline-flex items-center px-4 py-2 text-gray-500 bg-white rounded hover:bg-gray-100"
                    onClick={() => { setIsMonthOpen(!isMonthOpen); setIsYearOpen(false); }}
                >
                    {month}
                    <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                {isMonthOpen && <Month _month={month} setMonth={setMonth} setIsMonthOpen={setIsMonthOpen} />}
            </div>

        </div>
    </>;
}


function Panel({ days, start_day, selected, setSelected }) {
    const which_days = [
        { 'id': 1, 'name': 'S' },
        { 'id': 2, 'name': 'M' },
        { 'id': 3, 'name': 'T' },
        { 'id': 4, 'name': 'W' },
        { 'id': 5, 'name': 'T' },
        { 'id': 6, 'name': 'F' },
        { 'id': 7, 'name': 'S' }
    ]

    const before_days = Array.from(
        { length: start_day },
        (_, i) => ({ id: i, name: 'before' })
    )

    return <>
        <div className="bg-white grid grid-cols-7">
            {which_days.map(day => {
                return <div className="w-10 h-10 flex justify-center items-center font-serif font-bold" 
                            key={day.id}
                        >
                            {day.name}
                        </div>
            })}
            {before_days.map(day => {
                return <div className="w-10 h-10 flex justify-center items-center" key={day.id}></div>
            })}
            {days.map(day => {
                return <div
                    className={`w-10 h-10 flex justify-center items-center rounded-full
                        hover:cursor-pointer hover:bg-blue-200 hover:text-white
                        ${day.id === selected ? 'bg-blue-400 border-2 border-blue-500 text-white' : ''}`}
                    key={day.id}
                    onClick={() => { setSelected(day.id); }}
                >
                    <span className="font-sans">{day.name}</span>
                </div>
            })}
        </div>
    </>
}


function Calendar({selectedTs, setSelectedTs}) {
    const daysInMonth = function(year, month) {
        const date = new Date(year, month, 0);
        return date.getDate();
    }
    
    const [year, setYear] = useState(selectedTs.getFullYear());
    const [month, setMonth] = useState(selectedTs.getMonth() + 1);
    const [selected, setSelected] = useState(selectedTs.getDate());

    const [startTs, setStartTs] = useState(new Date(year, month - 1, 1));
    const [days, setDays] = useState(Array.from(
        { length: daysInMonth(year, month) },
        (_, i) => ({ id: i+1, name: i+1 })
    ));

    useEffect(() => {
        setStartTs(new Date(year, month - 1, 1));
        setDays(Array.from(
            { length: daysInMonth(year, month) },
            (_, i) => ({ id: i+1, name: i+1 })
        ));
        setSelectedTs(new Date(year, month - 1, selected));
    }, [year, month, setSelectedTs, selected]);


    return <>
        <main className="bg-black">
            <Menu year={year} setYear={setYear} month={month} setMonth={setMonth} />
            <Panel days={days} start_day={startTs.getDay()} selected={selected} setSelected={setSelected} />
        </main>
    </>
}


export { Calendar };
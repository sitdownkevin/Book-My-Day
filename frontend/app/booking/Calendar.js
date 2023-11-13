'use client';

import { useState, useEffect } from "react";

let count = 0;

function generateUUID() {
    count += 1;
    return count;
}


function Month({ _month, setMonth, setIsMonthOpen }) {
    const months = Array.from(
        { length: 12 },
        (_, i) => ({ id: generateUUID(), val: i })
    );

    const handleClick = (idx) => {
        setMonth(idx);
        setIsMonthOpen(false);
    }

    return <>
        <div className="origin-top-right rounded shadow bg-white">
            <div className="max-h-48 overflow-y-auto">
                {months.map((month) => {
                    return <>
                        <li className={`block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white ${month.id === _month ? 'bg-indigo-500 text-white' : ''}`}
                            key={month.id}
                            onClick={() => {
                                handleClick(month.val);
                            }}
                        >
                            {month.val + 1}
                        </li>
                    </>
                })}
            </div>
        </div>
    </>;
}


function Year({ _year, setYear, setIsYearOpen }) {
    const years = Array.from(
        { length: 6 },
        (_, i) => ({ id: generateUUID(), val: 2018 + i })
    );

    const handleClick = (idx) => {
        setYear(idx);
        setIsYearOpen(false);
    }

    return <>
        <div className="origin-top-right rounded shadow bg-white">
            <div className="max-h-48 overflow-y-auto">
                {years.map(year => {
                    return <>
                        <div className={`block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white ${year.val === _year ? 'bg-indigo-500 text-white' : ''}`}
                            key={year.id}
                            onClick={() => {
                                handleClick(year.val);
                            }}
                        >
                            {year.val}
                        </div>
                    </>
                })}
            </div>
        </div>
    </>;
}


function Menu({ year, setYear, month, setMonth, date, setDate }) {
    const [isYearOpen, setIsYearOpen] = useState(false);
    const [isMonthOpen, setIsMonthOpen] = useState(false);

    const isToday = () => {
        return ((new Date(Date.now())).getDate() === date) && ((new Date(Date.now())).getMonth() === month) && ((new Date(Date.now())).getFullYear() === year);
    }

    useEffect(() => {
        setIsYearOpen(false);
        setIsMonthOpen(false);
    }, [month, year, date]);


    return <>

            <div className="relative flex flex-col w-24">
                <button
                    className="inline-flex items-center px-4 py-2 text-gray-500 rounded hover:bg-gray-100"
                    onClick={() => { setIsYearOpen(!isYearOpen); setIsMonthOpen(false); }}
                >
                    {year}
                    <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                {isYearOpen && <Year _year={year} setYear={setYear} setIsYearOpen={setIsYearOpen} />}
            </div>

            <div className="relative flex flex-col w-20">
                <button
                    className="inline-flex items-center px-4 py-2 text-gray-500 rounded hover:bg-gray-100"
                    onClick={() => { setIsMonthOpen(!isMonthOpen); setIsYearOpen(false); }}
                >
                    {month + 1}
                    <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                {isMonthOpen && <Month _month={month} setMonth={setMonth} setIsMonthOpen={setIsMonthOpen} />}
            </div>

            <div className="relative flex flex-col w-20">
                <button
                    className={`inline-flex items-center px-4 py-2 rounded hover:bg-blue-200 ${isToday() ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}
                    onClick={() => { setIsMonthOpen(false); setIsYearOpen(false); setYear((new Date(Date.now())).getFullYear()); setMonth((new Date(Date.now()).getMonth())); setDate((new Date(Date.now())).getDate()); }}
                >
                    Today
                </button>
            </div>
    </>;
}


function Panel({ year, month, date, setDate }) {
    const isMonthYearCorrect = () => {
        return ((new Date(Date.now())).getMonth() === month) && ((new Date(Date.now())).getFullYear() === year);
    }

    const label_days = [
        { 'id': 1, 'name': 'S' },
        { 'id': 2, 'name': 'M' },
        { 'id': 3, 'name': 'T' },
        { 'id': 4, 'name': 'W' },
        { 'id': 5, 'name': 'T' },
        { 'id': 6, 'name': 'F' },
        { 'id': 7, 'name': 'S' }
    ]

    const fake_days = Array.from(
        { length: (new Date(year, month, 1, 0, 0, 0)).getDay() },
        (_, i) => ({ id: generateUUID(), name: 'before' })
    )

    const entity_days = Array.from(
        { length: (new Date(year, month, 0)).getDate() },
        (_, i) => ({ id: generateUUID(), name: i + 1 })
    )

    const handleClick = (id) => {
        setDate(id);
    }

    return <>
            <div className="grid grid-cols-7">
                {label_days.map(day => {
                    return <div className="w-10 h-10 flex justify-center items-center font-serif font-bold"
                        key={day.id}
                    >
                        {day.name}
                    </div>
                })}
                {fake_days.map(day => {
                    return <div className="w-10 h-10 flex justify-center items-center" key={day.id}></div>
                })}
                {entity_days.map(day => {
                    return <div
                        className={
                            `w-10 h-10 flex justify-center items-center rounded-full
                            hover:cursor-pointer hover:bg-blue-200 hover:text-white
                            ${ isMonthYearCorrect() && day.name === (new Date(Date.now())).getDate()? 'border-2 border-red-500': ''}
                            ${day.name === date ? 'bg-blue-400 border-2 border-blue-500 text-white ' : ''}
                            `
                        }
                        key={day.id}
                        onClick={() => { handleClick(day.name); }}
                    >
                        <span className="font-sans">{day.name}</span>
                    </div>
                })}
            </div>
    </>
}


function Calendar({ selectedTs, setSelectedTs }) {
    const [year, setYear] = useState((new Date(selectedTs)).getFullYear());
    const [month, setMonth] = useState((new Date(selectedTs).getMonth()));
    const [date, setDate] = useState((new Date(selectedTs)).getDate());

    useEffect(() => {
        setSelectedTs((new Date(year, month, date)).getTime());
        // console.log(selectedTs);
    }, [year, month, date]);

    return <>
            <div className="top-0 left-1/2 -translate-x-1/2 absolute flex flex-row z-10 h-6 w-72">
                <Menu year={year} setYear={setYear} month={month} setMonth={setMonth} date={date} setDate={setDate} />
            </div>
            <div className="top-10 left-1/2 -translate-x-1/2 absolute w-72">
                <Panel year={year} month={month} date={date} setDate={setDate} />
            </div>
    </>
}


export { Calendar };
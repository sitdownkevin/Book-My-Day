function EventToday({ selectedTs }) {
    const eventToday = [
        {
            'start_ts': new Date(2023, 11, 9, 9, 0, 0),
            'end_ts': new Date(2023, 11, 9, 13, 50),
            'id': '0x14',
        },
        {
            'start_ts': new Date(2023, 11, 9, 17, 0, 0),
            'end_ts': new Date(2023, 11, 9, 18, 50),
            'id': '0x14',
        }
    ];

    const eventTodayDb = {
        '0x13': {
            name: '上午聚会',
            description: '部门周会',
            type: 'meeting'
        },
        '0x14': {
            name: '午餐',
            description: '公司食堂',
            type: 'meal'
        },
        '0x15': {
            name: '下午茶',
            description: '休息15分钟',
            type: 'break'
        },
        '0x16': {
            name: '运动时间',
            description: '健身房',
            type: 'fitness'
        },
        '0x17': {
            name: '电影之夜',
            description: '和朋友看电影',
            type: 'entertainment'
        }
    };

    const formatTime = (hours, minutes) => {
        let h = hours;
        let m = minutes;
        if (h < 10) h = '0' + h;
        if (m < 10) m = '0' + m;
        return `${h}:${m}`;
    }

    return <>
        <main className="flex flex-col w-3/4 h-2/3  p-4 align-item space-y-4 border">
            <h1 className="text-5xl">{selectedTs.toDateString()}</h1>
            {eventToday.map(event => {
                return (<div className="flex flex-row justify-between border" key={event.id}>
                    <div className="flex flex-col space-y-4 p-4">
                        <div className="flex flex-row space-x-4">
                            <p>{eventTodayDb[event.id].description}</p>
                        </div>

                        <div className="flex flex-row space-x-4">
                            <p className="text-3xl">{eventTodayDb[event.id].name}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center space-y-4 p-4">
                        <p className="text-2xl">{formatTime(event.start_ts.getHours(), event.start_ts.getMinutes())}</p>
                        <p className="text-2xl ">{formatTime(event.end_ts.getHours(), event.end_ts.getMinutes())}</p>
                    </div>
                </div>);
            })}

        </main>
    </>;
}

export { EventToday };
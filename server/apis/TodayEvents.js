const { createEventDb } = require('../components/HandleIcs')


async function main() {
    const eventDb = await createEventDb();
    const selectedTs = new Date(2023, 9, 21, 0, 0, 0);

    const todayEvents = get_today_events_from_eventDb(eventDb, selectedTs);
    console.log(todayEvents);
}


function get_today_events_from_eventDb(eventDb, selectedTs) {
    todayEvents = [];
    todayEventsDb = [];

    const start_loc = eventDb.queryByStartTs(selectedTs);
    const end_loc = eventDb.queryByStartTs(new Date(selectedTs.getYear(), selectedTs.getMonth(), selectedTs.getDate() + 1, 0, 0, 0));
    
    console.log(start_loc, end_loc);

    new Date().getSecond
    for (let i=start_loc; i<end_loc; i++) {
        const event = eventDb.events[i];
        todayEvents.push({
            start_ts: event.start_ts,
            end_ts: event.end_ts,
            id: i
        });

        todayEventsDb.push({
            id: i,
            name: event.name,
            description: event.description,
        })
    }

    return {
        todayEvents,
        todayEventsDb
    };
}

main();

module.exports = {
    get_today_events_from_eventDb
}
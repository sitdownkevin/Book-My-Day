// async function main() {
//     const { createEventDb } = require('../components/HandleIcs')
//     const eventDb = await createEventDb();
//     const selectedTs = (new Date(2023, 9, 21, 0, 0, 0)).getTime();

//     const todayEvents = await get_todayEvents_and_todayEventsDb_from_eventDb(eventDb, selectedTs)
//                             .then(data => data);
//     console.log(todayEvents);
// }


async function get_todayEvents_and_todayEventsDb_from_eventDb(eventDb, selectedTs=1697817600000) {
    todayEvents = [];
    todayEventsDb = [];

    const start_loc = eventDb.queryByStartTs(selectedTs);
    const end_loc = eventDb.queryByStartTs(selectedTs + 86400000);
    
    // console.log(selectedTs, selectedTs + 86400000);
    // console.log(start_loc, end_loc);

    if (end_loc === 0 || start_loc === eventDb.events.length) {
        return { todayEvents, todayEventsDb };
    } else {
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
        return { todayEvents, todayEventsDb };
    }
}


// main();

module.exports = {
    get_todayEvents_and_todayEventsDb_from_eventDb
}
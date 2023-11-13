const path = require('path');
const { loadIcalFile } = require('./IcalFileLoading');
const { buildDbFromIcalFileString } = require('./IcalFileTransforming');

var eventsDb;

const loadDb = setInterval(() => {
    if (typeof eventsDb === 'undefined') {
        refresh_db();
    } else {
        clearInterval(loadDb);
        console.log('Db loaded!');
    }
}, 1000);

async function refresh_db() {
    const icalFileString = await loadIcalFile(path.join(__dirname, './db/calendar.ics'))
        .then(data => data);

    eventsDb = buildDbFromIcalFileString(icalFileString);
}


function getTodayEventInfo(selectedTs) {
    const todayEvents = [];
    const todayEventsDb = [];

    if (typeof eventsDb === 'undefined') {
        console.log('fresh');
        refresh_db();
        setTimeout(() => (getTodayEventInfo(selectedTs)), 500);
    }

    const l = eventsDb.queryByStartTs(selectedTs);
    const r = eventsDb.queryByStartTs(selectedTs + 1000 * 60 * 60 * 24);

    for (let k = l; k < r; k++) {
        todayEvents.push({
            id: eventsDb.events[k].uuid,
            start_ts: eventsDb.events[k].start_ts,
            end_ts: eventsDb.events[k].end_ts,
        })

        todayEventsDb.push({
            id: eventsDb.events[k].uuid,
            name: eventsDb.events[k].name,
            description: eventsDb.events[k].description,
        })
    }


    return {
        todayEvents,
        todayEventsDb
    }
}


module.exports = {
    getTodayEventInfo
}



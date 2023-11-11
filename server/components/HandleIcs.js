const { Event, EventDb } = require('./EventObj');
const { fetchIcs, fetchLocalIcs } = require('./FetchIcs');



function timeString2TimeStamp(_tString) {
    const year = parseInt(_tString.slice(0, 4), 10);
    const month = parseInt(_tString.slice(4, 6), 10) - 1;
    const day = parseInt(_tString.slice(6, 8), 10);
    const hour = parseInt(_tString.slice(9, 11), 10);
    const minute = parseInt(_tString.slice(11, 13), 10);
    const second = parseInt(_tString.slice(13, 15), 10);

    return new Date(Date.UTC(year, month, day, hour, minute, second));
};


function formatCheck(icsString) {
    // Check pairs
    let stack = [];
    icsString.split("\r\n").forEach((line) => {
        if (line.includes("BEGIN:")) {
            stack.push(line.split(":")[1]);
        }

        if (line.includes("END:")) {
            if (stack.pop() !== line.split(":")[1]) {
                return false;
            }
        }
    });
    // TODO: Check other attributes

    return true;
};


function extractEventsObj(icsString) {
    if (formatCheck(icsString) === false) {
        return null;
    }
    let events = [];
    let event_tmp = {};
    let record = false;
    icsString.split("\r\n").forEach((line) => {
        if (line.includes("BEGIN:VEVENT")) {
            event_tmp["id"] = events.length;
            event_tmp["content"] = "";
            record = true;
        } else if (line.includes("END:VEVENT")) {
            events.push(event_tmp);
            record = false;
            event_tmp = {};
        } else {
            // Record Info for Each Event
            if (record) {
                if (line.includes("SUMMARY")) {
                    event_tmp["name"] = line.split("SUMMARY:")[1];
                } else if (line.includes("DESCRIPTION")) {
                    event_tmp["description"] = line.split("DESCRIPTION:")[1];
                } else if (line.includes("RRULE:")) {
                    event_tmp["rrule"] = line.split("RRULE:")[1];
                } else if (line.includes("DTSTART")) {
                    event_tmp["start"] = line.split("DTSTART")[1];
                } else if (line.includes("DTEND")) {
                    event_tmp["end"] = line.split("DTEND")[1];
                } else if (line.includes("LOCATION")) {
                    event_tmp["location"] = line.split("LOCATION:")[1];
                }
            }
        }
    });

    return events; // TODO: Rename it
};


async function createEventDb() {
    const icsString = fetchLocalIcs();
    // const icsString = await fetchIcs();
    const events = extractEventsObj(icsString);

    // console.log(events[0]);

    const eventDb = new EventDb();

    events.forEach(item => {
        // Extracr start and end ts
        const regex_ts = /(\d{8}T\d{6})/;
        const start_ts = item.start.match(regex_ts)[1]; // 使用match方法进行匹配
        const end_ts = item.end.match(regex_ts)[1];

        const event = new Event(
            {
                name: item.name,
                description: item.description,
                location: item.location,
                start_ts: timeString2TimeStamp(start_ts),
                end_ts: timeString2TimeStamp(end_ts)
            }
        );

        eventDb.addEvent(event);
        
        // TODO: Rules for each item!!!
        // const regex = /([^=;]+)=([^;]+)?/g;
        // let match;
        // let result = {};

        // while ((match = regex.exec(item['rrule'])) !== null) {
        //     const key = match[1];
        //     const value = match[2] || true; // 如果没有值，则设为true
        //     result[key] = value;
        // }
    })

    return eventDb;
}


module.exports = {
    createEventDb,
}

// createEventDb().then(console.log).catch(console.log)
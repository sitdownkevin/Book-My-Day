const { fetchIcalFile, loadIcalFile } = require('./IcalFileLoading');

const { Event, EventDb } = require('./EventClass');


/**
 * IcalFileString => Db
 * import ical data into Database
*/
function formatCheck(icalFileString) {
    // Check pairs
    let stack = [];
    icalFileString.split("\r\n").forEach((line) => {
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



// TODO:
function event2Events(event) {
    const _event = new Event({
        name: event.name,
        description: event.description,
        location: event.location,
        start_ts: 1,
        end_ts: 2,
    })

    return [ _event ];
}


// TODO:
function buildDbFromIcalFileString(icalFileString) {
    if (formatCheck(icalFileString) === false) {
        return undefined;
    }

    const eventDb = new EventDb();

    let event = {
        name: null,
        description: null,
        rrule: null,
        location: null,
        start: null,
        end: null,
    };
    let recordFlag = false;
    icalFileString.split("\r\n").forEach((line) => {
        if (line.includes("BEGIN:VEVENT")) {
            recordFlag = true;
        } else if (line.includes("END:VEVENT")) {
            // deal with original event
            event2Events(event).forEach(event => {
                eventDb.addEvent(new Event());
            });
            recordFlag = false;
            event = {
                name: null,
                description: null,
                rrule: null,
                location: null,
                start: null,
                end: null,
            };
        } else {
            if (recordFlag) {
                if (line.includes("SUMMARY")) {
                    event["name"] = line.split("SUMMARY:")[1];
                } else if (line.includes("DESCRIPTION")) {
                    event["description"] = line.split("DESCRIPTION:")[1];
                } else if (line.includes("RRULE:")) {
                    event["rrule"] = line.split("RRULE:")[1];
                } else if (line.includes("DTSTART")) {
                    event["start"] = line.split("DTSTART")[1];
                } else if (line.includes("DTEND")) {
                    event["end"] = line.split("DTEND")[1];
                } else if (line.includes("LOCATION")) {
                    event["location"] = line.split("LOCATION:")[1];
                }
            }
        }
    });

    return eventDb;
};



/**
 * Db => JSON
*/





async function dev() {
    const path = require('path');
    icalFileString = await loadIcalFile(path.join(__dirname, './db/calendar.ics'))
        .then(data => data);
    
    const eventDb = buildDbFromIcalFileString(icalFileString);

    console.log(eventDb.events);
}

dev();
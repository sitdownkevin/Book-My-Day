const { fetchIcalFile, loadIcalFile } = require('./IcalFileLoading');

const { PreEvent, Event, EventsDb } = require('./EventClass');


/**
 * IcalFileString => Db
 * import ical data into Database
*/
function formatCheck(icalFileString) {
    /**  Check Pairs  */
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

    /** TODO: Others */

    return true;
};



function buildDbFromIcalFileString(icalFileString) {
    if (formatCheck(icalFileString) === false) {
        return undefined;
    }
    const eventsDb = new EventsDb();

    let preEvent;
    let recordFlag;
    icalFileString.split("\r\n").forEach((line) => {
        if (line.includes("BEGIN:VEVENT")) {
            preEvent = new PreEvent();
            recordFlag = true;
        } else if (line.includes("END:VEVENT")) {
            // console.log(preEvent);
            preEvent.generateAfterEvents().forEach(item => {
                eventsDb.addEvent(item);
            })
            recordFlag = false;
        } else {
            if (recordFlag) {
                if (line.includes("SUMMARY")) {
                    preEvent.name = line.split("SUMMARY:")[1];
                } else if (line.includes("DESCRIPTION")) {
                    preEvent.description = line.split("DESCRIPTION:")[1];
                } else if (line.includes("RRULE:")) {
                    // console.log(line);
                    preEvent.rrule = line.split("RRULE:")[1];
                } else if (line.includes("DTSTART")) {
                    preEvent.start_ts = line.split("DTSTART")[1];
                } else if (line.includes("DTEND")) {
                    preEvent.end_ts = line.split("DTEND")[1];
                } else if (line.includes("LOCATION")) {
                    preEvent.location = line.split("LOCATION:")[1];
                }
            }
        }
    });
    

    return eventsDb;
};

module.exports = {
    buildDbFromIcalFileString
}

/**
 * Db => JSON
*/



async function dev() {
    const path = require('path');
    // icalFileString = await loadIcalFile(path.join(__dirname, './db/calendar.ics'))
    //     .then(data => data);
    
    icalFileString = await fetchIcalFile('https://outlook.live.com/owa/calendar/00000000-0000-0000-0000-000000000000/00f9f87a-5664-449f-a166-8ed0efe08756/cid-CBD0172F236B818C/calendar.ics')
        .then(data => data);

    // const eventDb = buildDbFromIcalFileString(icalFileString);
    const eventsDb = buildDbFromIcalFileString(icalFileString);
    console.log(eventsDb.events);
}

// dev();
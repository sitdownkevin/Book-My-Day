const { rrulestr } = require('rrule');
const { v4: uuidv4 } = require('uuid');
/**
 * 后续想用db替代
 */
class PreEvent {
    constructor(name=undefined, description=undefined, location=undefined, start_ts=undefined, end_ts=undefined, rrule=undefined) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.start_ts = start_ts;
        this.end_ts = end_ts;
        this.rrule = rrule;
    }

    parseTimeString(timeString) {
        // Format: XXX 20230913T192000
        const tString = timeString.match(/\d{8}T\d{6}/)[0]; // '20230913T192000'
        const [date, time] = tString.split('T'); // ['20230913', '192000']
  
        const year = date.slice(0, 4);
        const month = date.slice(4, 6);
        const day = date.slice(6, 8);
        
        const hour = time.slice(0, 2);
        const minute = time.slice(2, 4);
        const second = time.slice(4, 6);
      
        return (new Date(year, month-1, day, hour, minute, second)).getTime();
    }


    generateAfterEvents() {
        const generatedEvents = [];
        generatedEvents.push(new Event(
            this.name,
            this.description,
            this.location,
            this.parseTimeString(this.start_ts),
            this.parseTimeString(this.end_ts),
        ))

        
        if (typeof this.rrule !== 'undefined') {
            try{
                const fuck = rrulestr(
                    `DTSTART:${this.start_ts.match(/\d{8}T\d{6}/)[0]}\n` + 
                    this.rrule
                );

                fuck.all().forEach(ts => {
                    generatedEvents.push(new Event(
                        this.name,
                        this.description,
                        this.location,
                        ts.getTime(),
                        ts.getTime() + this.parseTimeString(this.end_ts) - this.parseTimeString(this.start_ts),
                    ))
                })
            } catch (err) {
                console.log('rrule fail: ' + this.name);
                console.log(this.rrule);
            }

        }

        return generatedEvents;
    }
}



class Event {
    constructor(
        name, description, location, start_ts, end_ts,
        type = "event"
    ) {
        this.name = typeof name !== 'undefined'? name: 'Null';
        this.description = typeof description !== 'undefined'? description: 'Null';
        this.location = typeof name != 'undefined'? location: 'Null';
        this.start_ts = start_ts;
        this.end_ts = end_ts;
        this.type = type;
        this.uuid = undefined;
    }

    isLegal() {
        if (this.end_ts < this.start_ts) {
            return false;
        }
        return true;
    }
}

class EventsDb {
    constructor() {
        this.events = [];
        this.eventsMap = {};
    }

    uuidGenerator() {
        return uuidv4();
    }


    addEvent(event) {
        if (event.isLegal() && this.isLegal(event)) {
            const loc = this.queryByStartTs(event.start_ts);
            let uuid = this.uuidGenerator();
            while (typeof this.eventsMap[uuid] !== 'undefined') {
                uuid = this.uuidGenerator();
            }
            event.uuid = uuid;
            this.eventsMap[uuid] = event;
            this.events.splice(loc, 0, event);
        } else {
            console.log("event is illegal");
        }
    }

    delEevent(event) { }

    queryByStartTs(ts) {
        // 二分查找 根据start_ts获取插入的位置
        let i = 0;
        let j = this.events.length - 1;

        while (i <= j) {
            let mid = Math.floor((i + j) / 2);
            if (this.events[mid].start_ts < ts) {
                i = mid + 1;
            } else if (this.events[mid].start_ts > ts) {
                j = mid - 1;
            } else {
                return mid;
            }
        }
        return i;
    }

    isLegal(event) {
        const loc = this.queryByStartTs(event.start_ts);

        if (loc === 0) {
            if (this.events.length === 0) {
                return true;
            } else if (event.end_ts <= this.events[0].start_ts) {
                return true;
            }
        } else if (loc === this.events.length) {
            if (event.start_ts >= this.events[loc - 1].end_ts) {
                return true;
            }
        } else {
            if (
                event.start_ts >= this.events[loc - 1].end_ts &&
                event.end_ts <= this.events[loc].start_ts
            ) {
                return true;
            }
        }

        return false;
    }
}


module.exports = {
    PreEvent,
    Event,
    EventsDb
};



function dev() {
    const preEvent = new PreEvent('Fxck', '\\n', '', ';TZID=China Standard Time:20231019T103000', ';TZID=China Standard Time:20231019T110000','FREQ=WEEKLY;UNTIL=20231129T112000Z;INTERVAL=1;BYDAY=WE;WKST=SU');
    // console.log(preEvent);
    // console.log(preEvent.generateAfterEvents());
    const db = new EventsDb();
    preEvent.generateAfterEvents().forEach(item => {
        db.addEvent(item);
    })

    console.log(db);
}


// dev()
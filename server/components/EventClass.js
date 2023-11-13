/**
 * 后续想用db替代
 */

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
    }

    isLegal() {
        if (this.end_ts < this.start_ts) {
            return false;
        }
        return true;
    }
}

class EventDb {
    constructor() {
        this.events = [];
        this.eventsMap = {};
    }

    addEvent(event) {
        if (event.isLegal() && this.isLegal(event)) {
            const loc = this.queryByStartTs(event.start_ts);
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
    Event,
    EventDb
};



// function dev() {
//     const data = [
//         { start_ts: 1, end_ts: 2 },
//         { start_ts: 2, end_ts: 3 },
//         { start_ts: 3, end_ts: 4 },
//         { start_ts: 4, end_ts: 5 },
//     ];
//     let db = new EventDb();
//     data.forEach(item => {
//         let event = new Event(item.start_ts, item.end_ts);
//         db.addEvent(event);
//     });
//     console.log(db.events);
//     console.log(db.queryByStartTs(5));
//     db.addEvent(new Event(3.1, 2));
//     console.log(db.events);
// }


// dev()
import { Event, EventDb } from "./EventObj";
import { timeString2TimeStamp } from "./Utils";



const formatCheck = (icsTextFile) => {
    let stack = [];
    icsTextFile.split("\r\n").forEach((line) => {
        if (line.includes("BEGIN:")) {
            stack.push(line.split(":")[1]);
        }

        if (line.includes("END:")) {
            if (stack.pop() !== line.split(":")[1]) {
                return false;
            }
        }

        return true;
    });
};

const extractEventsObj = (icsTextFile) => {
    if (formatCheck(icsTextFile) === false) {
        return null;
    }
    let events = [];
    let event_tmp = {};
    let record = false;
    icsTextFile.split("\r\n").forEach((line) => {
        if (line.includes("BEGIN:VEVENT")) {
            event_tmp["id"] = events.length;
            event_tmp["content"] = "";
            record = true;
        } else if (line.includes("END:VEVENT")) {
            events.push(event_tmp);
            record = false;
            event_tmp = {};
        } else {
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
    return events;
};




(async () => {
    const ics_text = await fetchIcs(configs.ics_url);
    console.log(ics_text);

    let eventsObj = extractEventsObj(data);


    let _eventDb = new mE.EventDb();
    for (let i = 0; i < eventsObj.length; i++) {
        let item = eventsObj[i];

        const regex_ts = /(\d{8}T\d{6})/; // 使用正则表达式匹配时间戳
        const start_ts = item.start.match(regex_ts)[1]; // 使用match方法进行匹配
        const end_ts = item.end.match(regex_ts)[1];

        console.log(start_ts, end_ts);
        let _event = new mE.Event(
            {
                name: item.name,
                description: item.description,
                location: item.location,
                start_ts: timeString2TimeStamp(start_ts),
                end_ts: timeString2TimeStamp(end_ts)
            }
        );
        _eventDb.addEvent(_event);


        // const regex = /([^=;]+)=([^;]+)?/g;
        // let match;
        // let result = {};

        // while ((match = regex.exec(item['rrule'])) !== null) {
        //     const key = match[1];
        //     const value = match[2] || true; // 如果没有值，则设为true
        //     result[key] = value;
        // }

        // console.log(item.rrule)
        // console.log(result);
        // break;
    }
})();
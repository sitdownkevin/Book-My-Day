
const { getTodayEventInfo } = require('./QueryDb');


function today_events(req, res) {
    console.log('post api: /test/api/today_events')

    if (typeof req.body !== 'undefined' && typeof req.body.selectedTs !== 'undefined') {
        const selectedTs = typeof req.body.selectedTs === 'string' ? parseInt(req.body.selectedTs) : req.body.selectedTs;

        let data = getTodayEventInfo(selectedTs);

        res.json({
            condition: 'success',
            eventToday: data.todayEvents,
            eventTodayDb: data.todayEventsDb,
            date: (new Date(selectedTs)).toUTCString()
        })
    } else {
        res.json({
            condition: 'fail'
        })
    }
}


module.exports = {
    today_events
}
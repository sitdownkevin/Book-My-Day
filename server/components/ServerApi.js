const { app } = require('./Server');


// APIs


// const { get_todayEvents_and_todayEventsDb_from_eventDb } =  require('./apis/TodayEvents');
// const { createEventDb } = require('./components/HandleIcs')

// app.post('/api/test/today_events', async (req, res) => {
//     console.log('/api/test/today_events =>');
//     let selectedTs;
//     const eventDb = await createEventDb();
//     // @DEBUG
//     // console.log(req.body);
//     // console.log(req.body.selectedTs);
//     // console.log((new Date(req.body.selectedTs)).toUTCString());

//     if (typeof req.body !== 'undefined' && typeof req.body.selectedTs === 'number') {
//         selectedTs = req.body.selectedTs;
//         // selectedTs = 1697817600000;
//         const data = await get_todayEvents_and_todayEventsDb_from_eventDb(eventDb, selectedTs)
//                             .then(data => data)
//                             .catch(console.log);

//         res.json({
//             condition: 'success',
//             eventToday: data.todayEvents,
//             eventTodayDb: data.todayEventsDb,
//             date: (new Date(selectedTs)).toUTCString()
//         })
//     } else {
//         res.json({
//             condition: 'fail'
//         })
//     }
// })


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.listen(3001, () => {
    console.log(`Server is running on port 3001`);
});

// CORS Configs
const cors = require('cors');
app.use(cors());
app.options('/api/:path*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.send();
})

// Root Page
app.get('/', (req, res) => {
    res.send('Book-My-Day');
})


// APIs
const { get_todayEvents_and_todayEventsDb_from_eventDb } =  require('./apis/TodayEvents');
const { createEventDb } = require('./components/HandleIcs')
app.post('/api/test/today_events', async (req, res) => {
    let selectedTs;
    const eventDb = await createEventDb();
    if (typeof req.body !== 'undefined' && typeof req.body.selectedTs === 'string') {
        selectedTs = parseInt(req.body.selectedTs);
        selectedTs = 1697817600000;
        const data = await get_todayEvents_and_todayEventsDb_from_eventDb(eventDb, selectedTs)
                            .then(data => data)
                            .catch(console.log);

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
})
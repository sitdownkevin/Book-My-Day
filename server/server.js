const express = require('express');
const app = express();
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

app.get('/api/test/today_events', (req, res) => {
    const { eventToday, eventTodayDb } = require('./components/db/TestData');
    const data = {
        eventToday,
        eventTodayDb
    }

    res.json(data);
})
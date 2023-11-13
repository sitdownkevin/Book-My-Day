const express = require('express');

app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.options('/api/:path*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.send();
})


app.get('/', (req, res) => {
    res.send('Book-My-Day');
})

app.listen(3001, () => {
    console.log(`Server is running on port ${'3001'}`);
})


module.exports = {
    app
};


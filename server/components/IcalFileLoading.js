const { readFile } = require('fs');


async function fetchIcalFile(url) {
    return new Promise((resolve, reject) => {
        fetch(url, {mode: 'no-cors'})
          .then(res => res.text())
          .then(data => resolve(data))
          .catch(err => reject(err));
    })
}


async function loadIcalFile(path) {
    return new Promise((resolve, reject) => {
        readFile(path, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}


module.exports = {
    fetchIcalFile,
    loadIcalFile
}


/**
 * @DEBUG PURPOSE
 */
async function dev() {
    const path = require('path');
    let icalFileString;

    // icalFileString = await fetchIcalFile('https://outlook.live.com/owa/calendar/00000000-0000-0000-0000-000000000000/00f9f87a-5664-449f-a166-8ed0efe08756/cid-CBD0172F236B818C/calendar.ics')
    //     .then(data => data);

    icalFileString = await loadIcalFile(path.join(__dirname, './db/calendar.ics'))
        .then(data => data);
    
    console.log(icalFileString);
}

// dev()


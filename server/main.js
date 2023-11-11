

const { createEventDb } = require('./components/HandleIcs')


async function main() {
    const eventDb = await createEventDb();

    console.log(eventDb);
    const loc = eventDb.queryByStartTs(new Date(2023, 9, 1, 0, 0, 0));
    console.log(loc);

    

}

main();

const configs = {
    ics_url: 'https://outlook.live.com/owa/calendar/00000000-0000-0000-0000-000000000000/00f9f87a-5664-449f-a166-8ed0efe08756/cid-CBD0172F236B818C/calendar.ics',

}


// @return plain text
const fetchIcs = async (url=configs.ics_url) => {
    try {
        const response = await fetch(url, {mode: 'no-cors'});
        const text = await response.text();
        return text;
    } catch (e) {
        console.log(e);
        return e;
    }
}


const fetchLocalIcs = (ics_path) => {
    let data;
    try {
        data = fs.readFileSync(ics_path, "utf-8");
        return data;
    } catch (e) {
        console.log(e);
        return null;
    }
};



export { fetchIcs };
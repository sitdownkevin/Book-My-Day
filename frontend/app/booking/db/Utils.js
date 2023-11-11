
export function timeString2TimeStamp(_tString) {
    const year = parseInt(_tString.slice(0, 4), 10);
    const month = parseInt(_tString.slice(4, 6), 10) - 1;
    const day = parseInt(_tString.slice(6, 8), 10);
    const hour = parseInt(_tString.slice(9, 11), 10);
    const minute = parseInt(_tString.slice(11, 13), 10);
    const second = parseInt(_tString.slice(13, 15), 10);

    return new Date(Date.UTC(year, month, day, hour, minute, second));
};
import { parseISO, formatDistanceToNow, isEqual, isDate, format  } from "date-fns"
import React from 'react';
interface Time {
    timestamp: string,
    published: string
}
const TimeAgo: React.FC<Time> = ({timestamp, published}) => {
    let date: Date;
    let isSameDate = true;
    let referenceDate = parseISO("0001-01-01T00:00:00");
    let timeAgo = '';
    if(timestamp) {
        date = parseISO(timestamp)
        isSameDate = isEqual(date, referenceDate);
        
        timeAgo = `${published}` + formatDistanceToNow(date) + " ago";
    }
    return (
        <>
        {
            isSameDate ? <></> : <span >&nbsp;<i>{timeAgo}</i></span>
        }
        </>
    )
}

export default TimeAgo;
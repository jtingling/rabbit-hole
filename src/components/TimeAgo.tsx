import { parseISO, formatDistanceToNow, isEqual  } from "date-fns"
import React from 'react';
interface Time {
    timestamp: string
}
const TimeAgo: React.FC<Time> = ({timestamp}) => {
    let date: Date;
    let isSameDate = true;
    let referenceDate = parseISO("0001-01-01T00:00:00");
    let timeAgo = '';
    if(timestamp) {
        date = parseISO(timestamp)
        isSameDate = isEqual(date, referenceDate);
        timeAgo = "Published " + formatDistanceToNow(date) + " ago";
    }

    return (
        <>
        {
            isSameDate ? <></> : <span title={timestamp}>&nbsp; <i>{timeAgo}</i></span>
        }
        </>
    )
}

export default TimeAgo;
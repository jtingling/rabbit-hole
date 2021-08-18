import { useSelector } from "react-redux"
import { IQueryData, selectAllWords } from "../features/history/historySlice"

import TimeAgo from "./TimeAgo"

const HistoryCard: React.FC<{ word: IQueryData }> = ({ word }) => {
    return (
        <div>
            <h4>{word.searchWord}</h4>
            <span >&nbsp;<i>{word.date}</i></span>
            <p></p>
        </div>

    )
}

export default HistoryCard
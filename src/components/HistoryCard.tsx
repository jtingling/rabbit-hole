import { useSelector } from "react-redux"
import { IQueryData, selectAllWords } from "../features/history/historySlice"

import TimeAgo from "./TimeAgo"

const HistoryCard: React.FC<{ word: IQueryData }> = ({ word }) => {
    let findIdx;
    let searchApi;
    if (word.searchType.includes("WebSearchAPI")) {
        findIdx = word.searchType.search(/WebSearch/)
    } else if (word.searchType.includes("NewsSearchAPI")) {
        findIdx = word.searchType.search(/NewsSearchAPI/)
    }
    searchApi = word.searchType.slice(findIdx, -3);
    return (
        <div>
            <h4>{word.searchWord}</h4>
            <p>&nbsp;{searchApi}</p>
            <span>&nbsp;<i>{word.date}</i></span>
            <p></p>
        </div>

    )
}

export default HistoryCard
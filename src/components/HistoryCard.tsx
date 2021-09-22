import { useDispatch } from "react-redux"
import { IQueryData } from "../features/history/historySlice"
import '../styles/layout.css'
import { Link } from "react-router-dom";
import { updateQuery, updateUrl } from "../features/articles/searchSlice"

const HistoryCard: React.FC<{ word: IQueryData }> = ({ word }) => {
    let dispatch = useDispatch();
    console.log(word);
    const { searchWord: query, searchType: url } = word;
    let bracketIdx = word.date.search(/\(/);
    const date = word.date.substr(0, bracketIdx); //all dates have the same format
    let findIdx;
    let searchApi;
    if (word.searchType.includes("WebSearchAPI")) {
        findIdx = word.searchType.search(/WebSearch/)
    } else if (word.searchType.includes("NewsSearchAPI")) {
        findIdx = word.searchType.search(/NewsSearchAPI/)
    }
    searchApi = word.searchType.slice(findIdx, -3);
    return (
        <ul className="history-card-container">
            <li><Link to="/" onClick={() => { dispatch(updateUrl(url)); dispatch(updateQuery(query))} }>Keyword: {word.searchWord} searched on: <span><i>{date}</i> with: {searchApi}</span></Link></li>
        </ul>

    )
}

export default HistoryCard
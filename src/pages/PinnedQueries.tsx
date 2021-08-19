import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeKeyword, addKeyword, selectAllWords } from "../features/history/historySlice";
import HistoryCard from "../components/HistoryCard";
const PinnedQueries: React.FC = () => {
    const pinnedWords = useSelector(selectAllWords);

    return (
        <div>
            <h3>Search History</h3>

            {
                pinnedWords.searches.map((queries) => {
                    return (
                        <div><Link to="/"><HistoryCard word={queries} /></Link></div>
                    )
                })
            }

        </div>

    )
}

export default PinnedQueries;
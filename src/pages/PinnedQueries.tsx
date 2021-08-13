import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeKeyword, selectAllWords } from "../features/history/historySlice";
import { query } from "../features/articles/searchSlice";

const PinnedQueries: React.FC = () => {
    const pinnedWords = useSelector(selectAllWords);
    const dispatch = useDispatch();

    return (
        <div>
            <h3>Saved Search Queries</h3>
            <ul>
                {
                    pinnedWords.searches.map((word) => {
                        return (
                            <li><Link to="/"><button onClick={()=> dispatch(query(word))}>{word.query}</button></Link></li>
                        )
                    })
                }
            </ul>
        </div>

    )
}

export default PinnedQueries;
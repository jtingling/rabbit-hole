import { useSelector } from "react-redux";

import { selectAllWords } from "../features/history/historySlice";
import HistoryCard from "../components/HistoryCard";
const PinnedQueries: React.FC = () => {
    const pinnedWords = useSelector(selectAllWords);

    return (
        <div>
            {
                pinnedWords.searches.map((queries) => {
                    return (
                        <div><HistoryCard word={queries}/></div>
                    )
                })
            }

        </div>

    )
}

export default PinnedQueries;
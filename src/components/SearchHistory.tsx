import React, { useState } from 'react';
import { getQuery } from '../features/articles/searchSlice';
import { useDispatch, useSelector } from 'react-redux';

const SearchHistory: React.FC = () => {
    const [ querylist, setQueryList ] = useState<string[]>([]);
    let dispatch = useDispatch();
    const latestQuery = useSelector(getQuery)
    console.log(latestQuery);
    function renderQueries() {
        let list: string[] = querylist;
        if (latestQuery) {
            list.push(latestQuery)
            setQueryList(list);
        }
        return (
            <ul>
                {
                    querylist.map((query)=>{
                        return <li><button>{query}</button></li>
                    })
                }
            </ul>
        )
    }
    return (
        <>
        {
            renderQueries()
        }
        </>
    )
}

export default SearchHistory;
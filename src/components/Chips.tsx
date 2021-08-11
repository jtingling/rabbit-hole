import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios'
import '../styles/layout.css'
import { querySearch } from '../adapters';
import { getQuery, getSimilarUrl, getUrl } from '../features/articles/searchSlice';

interface IKeywords {
    name: string,
    score: number
}

const Chips: React.FC = () => {
    const [keywords, setKeywords] = useState<IKeywords[]>([])
    let searchWord = useSelector(getQuery);
    let searchUrl = useSelector(getUrl);
    let similarUrl = useSelector(getSimilarUrl);
    let dispatch = useDispatch()
    useEffect(()=>{
        ( async () => {
            let response: AxiosResponse<any> = await querySearch(searchWord, similarUrl);
            setKeywords(response.data)
        })()
    }, [searchWord, searchUrl, dispatch])

    const renderChips = () => {
        if (keywords.length > 0) {
            return (
                keywords.map((word, idx) => {
                    if (idx < 10) {
                        return <button className='chip'>{word.name}</button>
                    }
                })
            )
        } else {
            return <></>
        }
    }
    return (
        <div className='chips-layout'> {console.log(searchWord, similarUrl)}
        {renderChips()}
        </div>
    )
}

export default Chips;
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/layout.css'
import { querySearch, searchWeb } from '../adapters';
import { getQuery, getSimilarUrl, getUrl, updateQuery } from '../features/articles/searchSlice';

interface IKeywords {
    name: string,
    score?: number
}

const Chips: React.FC = () => {
    const [keywords, setKeywords] = useState<IKeywords[]>([])
    let searchWord = useSelector(getQuery);
    let searchUrl = useSelector(getUrl);
    let similarUrl = useSelector(getSimilarUrl);
    let dispatch = useDispatch()
    useEffect(()=>{
        ( async () => {
            try {
                let response: any = await querySearch(searchWord, similarUrl);
                setKeywords(response.data)
            } catch(e) {
                console.log(e)
            }
        })()
    }, [searchWord, searchUrl, similarUrl])

    const renderChips = () => {
        if (keywords !== undefined) {
            return (
                keywords.map((word, idx) => {
                    if (idx < 10) {
                        return <button className='chip' onClick={()=> {dispatch(updateQuery(word.name)); searchWeb(searchWord, searchUrl)} }>{word.name}</button>
                    } else return null;
                })
            )
        } else {
            return <></>
        }
    }
    return (
        <div className='chips-layout'>
        {renderChips()}
        </div>
    )
}

export default Chips;
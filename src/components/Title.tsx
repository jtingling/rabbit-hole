import React from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuery, getSimilarUrl, getUrl } from '../features/articles/searchSlice';
import { updateQuery } from '../features/articles/searchSlice'
import { addKeyword } from '../features/history/historySlice';
import '../styles/layout.css'
import '../styles/animation.css'
import Chips from './Chips'
import { Search } from '../features/articles/searchSlice'

interface Props {
    menuRef: React.MutableRefObject<HTMLElement | null>
}
const Title: React.FunctionComponent<Props> = ({ menuRef }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const dispatch = useDispatch();
    const searchWord = useSelector(getQuery);
    const searchSimilar = useSelector(getSimilarUrl)
    const searchType = useSelector(getUrl);

    let searchPayload: Search = {
        query: searchWord,
        url: searchType,
        similarUrl: searchSimilar
    }

    function toggleMenu(element: React.MutableRefObject<HTMLElement | null>): void {
        if (element.current !== null) {
            if (isOpen) {
                element.current.style.width = "0px";
                setIsOpen(false)
            } else {
                element.current.style.width = "200px";
                setIsOpen(true)
            }
        }
    }

    return (
        <> 
            <div className="title-ribbon">
                <button id="title-menu" type='button' onClick={() => toggleMenu(menuRef)}>menu</button>
                <div className="title-layout">
                    <h1>Rabbit Hole</h1>
                    <div className='title-search'>
                        <form>
                            <button type='submit' onClick={(e) => { e.preventDefault(); dispatch(updateQuery(searchValue)); setSearchValue("")}}>Search</button>
                            <input
                                type="search"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder={searchWord}
                                autoFocus />
                            <button type='button' onClick={(e)=> { e.preventDefault(); dispatch(addKeyword(searchPayload))}}>Pin Search</button>
                        </form>

                    </div>
                </div>
                <button id="title-login" type='submit'>Log In</button>
            </div>
            <Chips />
        </>

    )
}
export default Title;
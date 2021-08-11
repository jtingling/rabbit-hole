import React, { Dispatch, FormEventHandler, ReactPropTypes, SetStateAction } from 'react';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuery, getUrl } from '../features/articles/searchSlice';
import { updateQuery } from '../features/articles/searchSlice'
import '../styles/layout.css'
import '../styles/animation.css'
import Chips from './Chips'

interface Props {
    menuRef: React.MutableRefObject<HTMLElement | null>
}
const Title: React.FunctionComponent<Props> = ({ menuRef }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const dispatch = useDispatch();
    const searchWord = useSelector(getQuery);
    const searchType = useSelector(getUrl);

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
                            <button type='submit' onClick={(e) => {e.preventDefault(); dispatch(updateQuery(searchValue)); setSearchValue("")}}>Search</button>
                            <input
                                type="search"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Dive into a new Rabbit Hole."
                                autoFocus />
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
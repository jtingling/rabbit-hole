import React from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Authorisation from './Authorisation';
import { getQuery } from '../features/articles/searchSlice';
import { updateQuery } from '../features/articles/searchSlice'
import '../styles/layout.css'
import '../styles/animation.css'
import Chips from './Chips'

interface Props {
    menuRef: React.MutableRefObject<HTMLElement | null>,
    loginRef: React.MutableRefObject<HTMLButtonElement | null>,
    logoutRef: React.MutableRefObject<HTMLButtonElement | null>,
}
const Title: React.FunctionComponent<Props> = ({ menuRef, loginRef, logoutRef }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const dispatch = useDispatch();
    const searchWord = useSelector(getQuery);

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
                        </form>

                    </div>
                </div>
                <Authorisation logoutRef={logoutRef} loginRef={loginRef} />
            </div>
            <Chips />
        </>

    )
}
export default Title;
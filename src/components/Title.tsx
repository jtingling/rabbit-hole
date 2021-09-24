import React from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getQuery } from '../features/articles/searchSlice';
import { updateQuery } from '../features/articles/searchSlice'
import '../styles/layout.css'
import '../styles/colors.css'
import '../styles/modal.css'
import helpIcon from '../images/icons8-help-50.png'
import menuIcon from '../images/icons8-menu.svg'

import Chips from './Chips'
import Modal from './Modal'

interface Props {
    menuRef: React.MutableRefObject<HTMLElement | null>,

}
const Title: React.FunctionComponent<Props> = ({ menuRef }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
                <img id="title-menu" alt='menu' src={menuIcon} onClick={() => toggleMenu(menuRef)} />
                <div className="title-layout">
                    <h1>Rabbit Hole</h1>
                    <div className='title-search'>
                        <form>
                            <button type='submit' onClick={(e) => { e.preventDefault(); dispatch(updateQuery(searchValue)); setSearchValue("") }}>Search</button>
                            <input
                                type="search"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder={searchWord}
                                autoFocus />
                        </form>
                    </div>
                </div>
                <img alt='help' src={helpIcon} onClick={()=> setIsModalOpen(true)}/>
                <Modal
                    setIsOpen={setIsModalOpen}
                    title={"Instructions"}
                    show={isModalOpen}
                >
                    Type a word or short phrase into the text box and click search or enter on the keyboard to perform a web search.
                    Click the menu icon on the top left to access search history, settings and saved search results. You can toggle between
                    web or news type of search. By signing into your google account your saved search results will be there after closing the window. Rabbit
                    Hole only uses your google profile ID to save search results.
                </Modal>

            </div>
            <Chips />
        </>

    )
}
export default Title;
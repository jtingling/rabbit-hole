import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUrl, getUrl } from '../features/articles/searchSlice';
import '../styles/layout.css';

interface Props {
    subMenu: React.MutableRefObject<HTMLDivElement | null>
}
const ActionButton: React.FC<Props> = ({subMenu }) => {
    const [ isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const searchUrl = useSelector(getUrl);
    const toggleButtons = (element: React.MutableRefObject<HTMLDivElement | null>): void => {
        if (element.current !== null) {
            if (isOpen) {
                element.current.style.height = "0px";
                setIsOpen(false)
            } else {
                element.current.style.height = "160px";
                setIsOpen(true)
            }
        }
    }
    return (
        <div className='button-container'>
            <button className='action-button' onClick={() => toggleButtons(subMenu)}>+</button>
            <div className='subMenu-buttons' ref={subMenu}>
                <button id="web" onClick={()=> dispatch(updateUrl('https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI'))}>Web</button>
                <button id="news" onClick={()=>dispatch(updateUrl('https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI'))}>News</button>
            </div>
        </div>

    )
}

export default ActionButton
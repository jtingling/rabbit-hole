import React, { Dispatch, SetStateAction, useState } from 'react';
import '../styles/layout.css';

interface Props {
    subMenu: React.MutableRefObject<HTMLDivElement | null>
    setUrl: Dispatch<SetStateAction<string>>
}
const ActionButton: React.FC<Props> = ({subMenu, setUrl}) => {
    const [ isOpen, setIsOpen] = useState(false);
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
                <button id="web" onClick={()=>setUrl('https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI')}>Web</button>
                <button id="news" onClick={()=>setUrl('https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI')}>News</button>
            </div>
        </div>

    )
}

export default ActionButton
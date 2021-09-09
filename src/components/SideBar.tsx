import React, { useState, ChangeEvent } from 'react';
import { Link }  from 'react-router-dom'



import ToggleSwitch from './ToggleSwitch';

interface Props {
    menuRef: React.MutableRefObject<HTMLElement | null>,
    subMenuRef: React.MutableRefObject<HTMLDivElement | null>,
}
const SideBar: React.FunctionComponent<Props> = ({menuRef, subMenuRef}) => {
    const [isChecked, setIsChecked] = useState(false);
    

    const toggleSearchType = (checked: boolean) => {
        console.log(checked)
        setIsChecked(checked)
    }
    return (
        <aside id="menu" ref={menuRef}>
            <ul>
                <li><Link to="/">Search</Link></li>
                <li><Link to="/SavedResults">Saved Results</Link></li>
                <li><Link to="/SearchHistory">Search History</Link></li>
            </ul>
            <h4 className='settings'>Settings</h4>
            <ToggleSwitch name="search" id='SearchType' checked={isChecked} onChange={toggleSearchType} />
            
        </aside>
    )
}

export default SideBar
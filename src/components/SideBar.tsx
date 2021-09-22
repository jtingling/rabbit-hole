import React, { useState } from 'react';
import { Link } from 'react-router-dom'



import ToggleSwitch from './ToggleSwitch';

interface Props {
    menuRef: React.MutableRefObject<HTMLElement | null>,
}
const SideBar: React.FunctionComponent<Props> = ({ menuRef }) => {
    const [isChecked, setIsChecked] = useState(false);


    const toggleSearchType = (checked: boolean) => {
        console.log(checked)
        setIsChecked(checked)
    }
    return (
        <aside ref={menuRef}>
            <div className='menu-container'>
                <h2>Menu</h2>
                <ul>
                    <li><Link to="/">Search</Link></li>
                    <li><Link to="/SavedResults">Saved Results</Link></li>
                    <li><Link to="/SearchHistory">Search History</Link></li>
                </ul>
                <h4 className='settings'>Settings</h4>
                <ToggleSwitch name="search" id='SearchType' checked={isChecked} onChange={toggleSearchType} />
            </div>
        </aside>
    )
}

export default SideBar
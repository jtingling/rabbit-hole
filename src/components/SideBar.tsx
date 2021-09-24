import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Authorisation from './Authorisation';

import ToggleSwitch from './ToggleSwitch';

interface Props {
    menuRef: React.MutableRefObject<HTMLElement | null>,
    loginRef: React.MutableRefObject<HTMLDivElement | null>,
    logoutRef: React.MutableRefObject<HTMLButtonElement | null>,
}
const SideBar: React.FunctionComponent<Props> = ({ menuRef, loginRef, logoutRef }) => {
    const [isChecked, setIsChecked] = useState(false);

    const toggleSearchType = (checked: boolean) => {
        setIsChecked(checked)
    }
    return (
        <aside ref={menuRef}>
            <div className='menu-container'>
                <h2>Menu</h2>
                <ul>
                    <Link to="/"><li>Search</li></Link>
                    <li><Link to="/SavedResults">Saved Results</Link></li>
                    <li><Link to="/SearchHistory">Search History</Link></li>
                    <li><Authorisation logoutRef={logoutRef} loginRef={loginRef} /></li>
                </ul>

                <h4 className='settings'>Settings</h4>
                <ToggleSwitch name="search" id='SearchType' checked={isChecked} onChange={toggleSearchType} />
            </div>
        </aside>
    )
}

export default SideBar
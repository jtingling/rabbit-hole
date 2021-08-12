import { useState, useEffect, useRef } from 'react'
import { Link }  from 'react-router-dom'
import '../styles/layout.css'
import '../styles/colors.css'
import '../styles/font.css'
interface Props {
    menuRef: React.MutableRefObject<HTMLElement | null>,
}
const SideBar: React.FunctionComponent<Props> = ({menuRef}) => {

    return (
        <aside id="menu" ref={menuRef}>
            <h3>Menu</h3>
            <ul>
                <li><Link to="/">Home</Link></li>
            </ul>
            <ul>
                <li><Link to="/SavedResults">Saved Results</Link></li>
                <li>Pinned Queries</li>
                <li>logout</li>
            </ul>
        </aside>
    )
}

export default SideBar
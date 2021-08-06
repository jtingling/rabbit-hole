import { Ref, RefObject } from 'react'
import '../styles/layout.css'
interface Props {
    menuRef: React.MutableRefObject<HTMLElement | null>,
}
const SideBar: React.FunctionComponent<Props> = ({menuRef}) => {

    return (
        <aside id="menu" ref={menuRef}>
            <h3>Menu</h3>
            <ul>
                <li>Home</li>
                <li>List 1</li>
                <li>List 2</li>
                <li>pinned articles</li>
                <li>log out</li>
            </ul>
        </aside>
    )
}

export default SideBar
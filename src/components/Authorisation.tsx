import React from 'react';
import { Link } from 'react-router-dom'


interface Props {
    loginRef: React.MutableRefObject<HTMLButtonElement | null>
    logoutRef: React.MutableRefObject<HTMLButtonElement | null>
}

const Authenticate: React.FC<Props> = ({loginRef, logoutRef}) => {

    return (
        <div className='authorization-container'>
        <div className="App">
            <header className="App-header">
                    <button ref={logoutRef} id="signout-button" style={{display: "none"}}><Link to="/">Sign Out</Link></button>
                    <button ref={loginRef} id="authorize-button"><Link to="/">Authorize</Link></button>
            </header>
        </div>
    </div>
    )
}
const Authorization: React.FC<Props> = ({ loginRef, logoutRef }) => {
    return (
        <Authenticate loginRef={loginRef} logoutRef={logoutRef}/>
    )
}

export default Authorization
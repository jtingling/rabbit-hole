import React from 'react';
import { Link } from 'react-router-dom'

import gSSO from '../images/web/1x/btn_google_signin_dark_normal_web.png'


interface Props {
    loginRef: React.MutableRefObject<HTMLDivElement | null>
    logoutRef: React.MutableRefObject<HTMLButtonElement | null>
}

const Authenticate: React.FC<Props> = ({ loginRef, logoutRef }) => {

    return (
        <div className='authorization-container'>
            <div className="App">
                <header className="app-header">
                    <button ref={logoutRef} id="signout-button" style={{ display: "none" }}><Link to="/">Sign Out</Link></button>
                    <div ref={loginRef} id="authorize-button">
                        <Link to="/"><img alt='sign in' src={gSSO} /></Link>
                    </div>
                </header>
            </div>
        </div>
    )
}
const Authorization: React.FC<Props> = ({ loginRef, logoutRef }) => {
    return (
        <Authenticate loginRef={loginRef} logoutRef={logoutRef} />
    )
}

export default Authorization
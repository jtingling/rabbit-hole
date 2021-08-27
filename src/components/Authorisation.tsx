import React, { useEffect, useState } from 'react';

type logOut = () => void;

interface Props {
    name: string,
    email: string,
    loggedIn: boolean,
    imageUrl: string,
    logOut: logOut,
    loginRef: React.MutableRefObject<HTMLButtonElement | null>
    logoutRef: React.MutableRefObject<HTMLButtonElement | null>
    signInWindowRef: React.MutableRefObject<HTMLDivElement | null>
    gapi: any,
}
const Authorization: React.FC<Props> = ({ loginRef, logoutRef, name, email, loggedIn, imageUrl, logOut, gapi, signInWindowRef }) => {


    useEffect(() => {

    }, [])
    return (
        <div className='authorization-container' ref={signInWindowRef} style={{ display: "none" }}>
            <div className="App">
                <header className="App-header">
                    <button ref={loginRef} id="authorize-button" style={{display: "none"}}>Authorize</button>
                    <button ref={logoutRef} id="signout-button" style={{display: "none"}}>Sign Out</button>
                </header>
            </div>
        </div>
    )
}

export default Authorization
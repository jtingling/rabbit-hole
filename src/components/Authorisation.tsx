
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'

declare const window: any;

interface Props {
    loginRef: React.MutableRefObject<HTMLButtonElement | null>
    logoutRef: React.MutableRefObject<HTMLButtonElement | null>
}

const Authenticate: React.FC<Props> = ({loginRef, logoutRef}) => {
    const [ gapi, setGapi ] = useState<any>(null)

    useEffect(()=>{
        const gapi = window.gapi;
        setGapi(gapi);

    },[])

    return (
        <div className='authorization-container'>
        <div className="App">
            <header className="App-header">
                    <button ref={logoutRef} id="signout-button">Sign Out</button>
                    <button ref={loginRef} id="authorize-button" >Authorize</button>
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
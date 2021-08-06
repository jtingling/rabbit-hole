import React, { ReactPropTypes } from 'react';
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import '../styles/layout.css'
import '../styles/animation.css'
import Chips from './Chips'

interface Props {
    menuRef: React.MutableRefObject<HTMLElement | null>,
}
const Title: React.FunctionComponent<Props> = ({menuRef}) => {
    const [ isOpen, setIsOpen] = useState(false);
    function toggleMenu(element: React.MutableRefObject<HTMLElement | null>): void {
        if (element.current !== null) {
            if (isOpen) {
                element.current.style.width = "0px";
                setIsOpen(false)
            } else {
                element.current.style.width = "200px";
                setIsOpen(true)
            }
            console.log(isOpen)
        }
        
    }
    return (
        <>
            <div className="title-ribbon">
                <button id="title-menu" type='button' onClick={()=> toggleMenu(menuRef)}>menu</button>
                <div className="title-layout">
                    <h1>Rabbit Hole</h1>
                    <div className='title-search'>
                        <button type='submit'>Search</button>
                        <input type="search" placeholder="Dive into a new Rabbit Hole." autoFocus />
                    </div>
                </div>
                <button id="title-login" type='submit'>Log In</button>
            </div>
            <div className='chips-layout'>
                <Chips/>
            </div>
        </>

    )
}
export default Title;
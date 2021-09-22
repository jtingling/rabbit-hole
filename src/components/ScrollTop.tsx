import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash'
import scrollIcon from '../images/icons8-double-up-48.png'

const ScrollTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const pageScrollTo = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(()=>{
        const scrollEvent = () =>{
            if (Math.round(window.scrollY) > 600) {
                
                setIsVisible(true);
            } else {
                console.log('test')
                setIsVisible(false);
            }
        }
        document.addEventListener('scroll', scrollEvent)
        console.log(Math.round(window.scrollY))
        return ()=> document.removeEventListener('scroll', scrollEvent);
    },[])



    return (
        <>
            {
            isVisible && 
                <div className="scroll-icon" onClick={()=> pageScrollTo()} title="scroll to top">
                    <img alt='scroll up' src={scrollIcon} />
                </div>
            }
        </>
    )
}

export default ScrollTop;
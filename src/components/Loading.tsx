import React from 'react'
import loadingSpinner from '../images/Spinner-2.gif'
import '../styles/loading.css'
const Loading: React.FC<{loadingStatus:boolean}> = ({loadingStatus}) => {

    return (
        <>
        {
            loadingStatus &&
            <div className="result-load-container">
                <img className='loading-gif' src={loadingSpinner} alt='loading...'/>
            </div>
        }
        </>
    )
}

export default Loading
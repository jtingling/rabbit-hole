import React from 'react';
import '../styles/modal.css'

interface IModal {
    setIsOpen: (b:boolean) => void,
    title: string,
    show: boolean,
    children: string
}
const Modal: React.FC<IModal> = ({ setIsOpen, title, show, children }) => {
    if (!show) return null;
    return (
        <div className="outer-window">
            <div className="modal-container">
                <button className='action' onClick={() => setIsOpen(false)}>X</button>
                <h2 className='modal-title'>{title}</h2>
                <p className="modal-content">{children}</p>
            </div>
        </div>
    )
}

export default Modal
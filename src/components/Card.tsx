import React from 'react'
import '../styles/layout.css'

export interface Props {
    title: string;
    subTitle: string;
    stub: string;   
}
const Card: React.FC<Props> = ({title, subTitle, stub}) => {

    return (
        <article>
            
            <div>
                <img/>
                <button type='button'>Save to List</button>
                <h4>{title}</h4>
                <h5>{subTitle}</h5>
                <p>{stub}</p>
            </div>
            
        </article>
    )
}

export default Card;
import React from 'react'
import '../styles/layout.css'
import TimeAgo from './TimeAgo'

export interface Props {
    title: string;
    stub: string;   
    image: any;
    publishDate: string;
}
const Card: React.FC<Props> = ({title, stub, image, publishDate}) => {

    return (
        <article>
            <div>
                <img src={image}/>
                <div>
                    <h4>{title}</h4>
                    <TimeAgo timestamp={publishDate}/>
                </div>
                <p>{stub}</p>
            </div>
            <button type='button'>Save to List</button>
        </article>
    )
}

export default Card
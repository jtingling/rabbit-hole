import React from 'react'
import '../styles/layout.css'
import TimeAgo from './TimeAgo'

export interface Props {
    id: string,
    title: string;
    stub: string;
    image: string;
    publishDate: string;
    url: string;
}
const Card: React.FC<Props> = ({ title, stub, image, publishDate, id, url, children}) => {
    return (
        <article key={id}>
            <div>
                <img src={image} alt={title}/>
                <div>
                    <h4><a href={url} target="_blank" rel="noreferrer">{title}</a></h4>
                    
                    <TimeAgo timestamp={publishDate} published={"Published "}/>
                </div>
                <p>{stub}</p>
            </div>
            {children}
        </article>
    )
}

export default Card;
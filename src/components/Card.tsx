import React, { useEffect, useRef } from 'react'
import '../styles/layout.css'
import '../styles/colors.css'
import TimeAgo from './TimeAgo'

export interface Props {
    articleId: string,
    title: string;
    stub: string;
    image: string;
    publishDate: string;
    url: string;
}
const Card: React.FC<Props> = ({ title, stub, image, publishDate, articleId, url, children }) => {
    let titleRef = useRef<HTMLHeadingElement | null>(null)

    return (
        <article key={articleId} className='article-container'>
            <div className='article-body'>
                <img src={image} alt={title} />
                <div className='animate-container'>
                    <h4 ref={titleRef}><a href={url} target="_blank" rel="noreferrer">{title}</a></h4>
                    <TimeAgo timestamp={publishDate} published={"Published "} />
                    <p>{stub}</p>
                </div>
                <p className='card-children-container'>
                        {children}
                    </p>
            </div>

        </article>
    )
}

export default Card;
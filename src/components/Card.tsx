import React, {  useRef } from 'react'
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
    const imgRef = useRef<HTMLImageElement>(document.createElement('img'))
    const titleRef = useRef<HTMLHeadingElement>(document.createElement('h4'))
    const pRef = useRef<HTMLParagraphElement>(document.createElement('p'))
  
    const handleError = () => {
        imgRef.current.style.display = 'none';
        titleRef.current.style.textAlign = 'left';
        pRef.current.style.width = '99%';
        pRef.current.style.margin = '0 auto';
        
    }
    
    return (
        <article key={articleId} className='article-container' >
            <div className='article-body'>
                <img src={image} alt={title} onError={handleError} ref={imgRef}/>
                <div className='animate-container'>
                    <h4 ref={titleRef} title={title}><a href={url} target="_blank" rel="noreferrer">{title}</a></h4>
                    <TimeAgo timestamp={publishDate} published={"Published "} />
                    <p>{stub}</p>
                </div>
                <p ref={pRef} className='card-children-container'>
                        {children}
                    </p>
            </div>

        </article>
    )
}

export default Card;
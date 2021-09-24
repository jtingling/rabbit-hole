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
    const divRef = useRef<HTMLDivElement>(document.createElement('div'))
    const pRef = useRef<HTMLParagraphElement>(document.createElement('p'))
  
    const handleError = () => {
        imgRef.current.style.display = 'none';
        titleRef.current.style.textAlign = 'left';
        divRef.current.style.width = '99%';
        divRef.current.style.margin = '0 auto';
        pRef.current.style.height = '80px';
        
    }
    
    return (
        <article key={articleId} className='article-container' >
            <div className='article-body'>
                <img src={image} alt={title} onError={handleError} ref={imgRef}/>
                <div className='animate-container'>
                    <h4 ref={titleRef} title={title}><a href={url} target="_blank" rel="noreferrer">{title}</a></h4>
                    <TimeAgo timestamp={publishDate} published={"Published "} />
                    <p ref={pRef}>{stub}</p>
                </div>
                <div ref={divRef} className='card-children-container'>
                        {children}
                </div>
            </div>

        </article>
    )
}

export default Card;
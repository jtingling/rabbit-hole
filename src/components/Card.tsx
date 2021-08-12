import React, { useState } from 'react'
import '../styles/layout.css'
import TimeAgo from './TimeAgo'
import { useDispatch } from 'react-redux'

import { addArticle, removeArticle } from '../features/articles/articleSlice'
export interface Props {
    id: string,
    title: string;
    stub: string;   
    image: any;
    publishDate: string;
    url: string;
}
const Card: React.FC<Props> = ({title, stub, image, publishDate, id, url}) => {
    const [ isSaved, setIsSaved ] = useState<boolean | null>(null)
    let dispatch = useDispatch()

    return (
        <article>
            <div>
                <img src={image}/>
                <div>
                    <h4><a href={url}>{title}</a></h4>
                    <TimeAgo timestamp={publishDate}/>
                </div>
                <p>{stub}</p>
            </div>

            <button type='button' onClick={()=> dispatch(addArticle({id, title, stub, image, publishDate, url }))}>Save Result</button>
        </article>
    )
}

export default Card;
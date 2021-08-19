import React, { useState } from 'react'
import '../styles/layout.css'
import TimeAgo from './TimeAgo'
import { useDispatch, useSelector } from 'react-redux'
import { addArticle, removeArticle, selectAllArticles } from '../features/articles/articleSlice'
import SaveButton from './SaveButton'

export interface Props {
    id: string,
    title: string;
    stub: string;
    image: string;
    publishDate: string;
    url: string;
}
const Card: React.FC<Props> = ({ title, stub, image, publishDate, id, url, children}) => {
    let dispatch = useDispatch()
    let savedArticles = useSelector(selectAllArticles)

    return (
        <article key={id}>
            <div>
                <img src={image} />
                <div>
                    <h4><a href={url} target="_blank">{title}</a></h4>
                    
                    <TimeAgo timestamp={publishDate} published={"Published "}/>
                </div>
                <p>{stub}</p>
            </div>
            {children}
        </article>
    )
}

export default Card;
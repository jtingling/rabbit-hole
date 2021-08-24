import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addArticle } from "../features/articles/articleSlice";
import { Article } from '../features/articles/articleSlice'

const SaveButton: React.FC<any> = ({resultData}) => {
    const [isSaved, setIsSaved] = useState<boolean | null>(false);
    const dispatch = useDispatch();

    const article: Article = {
        id: resultData.id,
        image: resultData.image,
        title: resultData.title,
        stub: resultData.snippet,
        url: resultData.url,
        publishDate: resultData.datePublished

    }
    function toggleButton () {
        dispatch(addArticle(article))
        setIsSaved(true);
    }

    useEffect(()=>{
        setIsSaved(false);
    },[resultData])

    return (
        <>
            {
                isSaved ? <button disabled>Saved</button> : <button onClick={()=> toggleButton()}>Save Article</button>
            }
        </>
    )
}

export default SaveButton;
import { id } from "date-fns/locale";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addArticle, selectAllArticles, selectArticleById } from "../features/articles/articleSlice";
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
    console.log(resultData);
    function toggleButton () {
        dispatch(addArticle(article))
        setIsSaved(true);
    }

    return (
        <>
            {
                isSaved ? <button disabled>Saved</button> : <button onClick={()=> toggleButton()}>Save Article</button>
            }
        </>
    )
}

export default SaveButton;
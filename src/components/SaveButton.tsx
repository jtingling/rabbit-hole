import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addArticle, selectId, Article } from "../features/articles/articleSlice";
import { useSelector } from "react-redux";

const SaveButton: React.FC<any> = ({resultData, db}) => {
    const [isSaved, setIsSaved] = useState<boolean | null>(false);
    const dispatch = useDispatch();
    const userId = useSelector(selectId);

    const article: Article = {
        articleId: resultData.id,
        image: resultData.image,
        title: resultData.title,
        stub: resultData.snippet,
        url: resultData.url,
        publishDate: resultData.datePublished,
        userId: userId

    }
    function handleSave () {
        dispatch(addArticle(article))
        if (db && !!userId) {
            let result = db.transaction('users', 'readwrite').objectStore('users').add(article);
            result.onerror = (e: any) => console.error("Failed to add article: " + e);
            result.onsuccess = (e: any) => console.log("Added result to db.")
        }
        setIsSaved(true);
    }

    useEffect(()=>{
        setIsSaved(false);
    },[resultData])

    return (
        <>
            {
                isSaved ? <button disabled>Saved</button> : <button onClick={()=> handleSave()}>Save Article</button>
            }
        </>
    )
}

export default SaveButton;
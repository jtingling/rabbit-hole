
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { removeArticle, selectId } from "../features/articles/articleSlice";

const DeleteButton: React.FC<any> = ({articleId, db}) => {

    const [isDeleted, setIsDeleted] = useState(false);
    const dispatch = useDispatch();
    const userId = useSelector(selectId);
    function deleteArticle () {
        if (db && !!userId) {
            let objectStore = db.transaction('users', 'readwrite')
            let result = objectStore.objectStore('users').index('articleId')
            result.getAll().onsuccess = (event: any) => {
                event.target.result.map((record: any)=>{
                    if (record.userId === userId && record.articleId === articleId) {
                        let request = objectStore.objectStore('users').index("articleId").getKey(articleId)
                        console.log(request);
                        request.onsuccess = (event: any)=>{
                            console.log(event);
                            objectStore.objectStore('users').delete(event.target.result)
                        }
                    }
                })
            }
            result.onerror = (e: any) => console.error("Failed to get articles: " + e);
            result.onsuccess = (e: any) => {
                console.log("Articles Loaded.")
            }
        }
        dispatch(removeArticle(articleId))
        setIsDeleted(true);
    }
    useEffect(()=>{
        setIsDeleted(false);
    },[articleId])
    return (
        <>
        {
            isDeleted ? <button disabled>Deleted</button> : <button type='button' onClick={()=> deleteArticle()}>Delete</button>
        }
        </>
    )
}


export default DeleteButton;
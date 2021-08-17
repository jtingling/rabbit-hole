import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { removeArticle, selectAllArticles } from "../features/articles/articleSlice";

const DeleteButton: React.FC<any> = ({id}) => {

    const [isDeleted, setIsDeleted] = useState(false);
    const dispatch = useDispatch();

    function deleteArticle () {
        dispatch(removeArticle(id))
        setIsDeleted(true);
    }
    useEffect(()=>{
        setIsDeleted(false);
    },[id])
    return (
        <>
        {
            isDeleted ? <button disabled>Deleted</button> : <button type='button' onClick={()=> deleteArticle()}>Delete</button>
        }
        </>
    )
}


export default DeleteButton;
import React, { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import Card from '../components/Card';
import magnifySVG from '../images/magnify-glass.svg';
import DeleteButton from '../components/DeleteButton';
import { selectAllArticles } from '../features/articles/articleSlice';

declare const window: any;

const SavedResults: React.FC<{db: any, userId: string}> = ({db, userId }): JSX.Element => {
    let savedResults = useSelector(selectAllArticles);
    let statusRef = useRef<HTMLParagraphElement | null>(null);
    if (!!statusRef.current) {
        statusRef.current.innerText = "Make a search"
    }
    useEffect(()=>{
        const gapi = window.gapi;
        if(!!gapi && !!statusRef.current) {
            console.log(gapi);
            if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
                if (savedResults.articles.length === 0) {
                    statusRef.current.innerText = "No saved articles"
                }
            } else {
                statusRef.current.innerText = "Make a search to save articles"
            }
        }
    },[savedResults.articles])


    return (
        <div>
            {   
                savedResults.articles.map((result: any) => {
                    let placeholder = "";
                    result.image.url === "" ? placeholder = magnifySVG : placeholder = result.image.url;
                    return <Card 
                        image={placeholder} 
                        title={result.title} 
                        stub={result.stub} 
                        publishDate={result.publishDate} 
                        url={result.url} 
                        articleId={result.articleId}
                        >
                            <DeleteButton articleId={result.articleId} db={db} userId={userId}/>
                        </Card>
                  })
            }
            <p ref={statusRef} id="status-text"></p>
        </div>

    )
}

export default SavedResults;
import React, { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import Card from '../components/Card';
import DeleteButton from '../components/DeleteButton';
import { selectAllArticles } from '../features/articles/articleSlice';


const SavedResults: React.FC<{db: any, userId: string}> = ({db, userId }): JSX.Element => {
    let savedResults = useSelector(selectAllArticles);

    return (
        <div>
            <p id="status-text"><i >Saved searches appear here</i></p>
            {   
                savedResults.articles.map((result: any) => {
                    return <Card 
                    image={result.image.url}
                    title={result.title}
                    stub={result.stub.description}
                    publishDate={result.datePublished}
                    url={result.url}
                    articleId={result.id}
                        >
                            <DeleteButton articleId={result.articleId} db={db} userId={userId}/>
                        </Card>
                  })
            }
            
        </div>

    )
}

export default SavedResults;
import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Card from '../components/Card';
import magnifySVG from '../images/magnify-glass.svg';
import DeleteButton from '../components/DeleteButton';
import { useEffect } from 'react';
import { selectId, Article, setArticles, addArticle, selectAllArticles } from '../features/articles/articleSlice';

const SavedResults: React.FC<{db: any}> = ({db}): JSX.Element => {
    const dispatch = useDispatch();
    const [ resultsDb, setResultsDb ] = useState(null);
    let savedResults = useSelector(selectAllArticles);
    let userId = useSelector(selectId)


    return (
        <div>
            {   
                savedResults.articles.length > 0 ? savedResults.articles.map((result: any) => {
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
                            <DeleteButton articleId={result.articleId} db={db}/>
                        </Card>
                  }) : <p>No saved articles.</p>
            }
        </div>

    )
}

export default SavedResults;
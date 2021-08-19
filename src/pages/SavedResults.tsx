import React from 'react';
import { useSelector } from "react-redux";
import { selectAllArticles } from '../features/articles/articleSlice';
import Card from '../components/Card';
import magnifySVG from '../images/magnify-glass.svg';
import { useRouteMatch, withRouter, RouteComponentProps } from 'react-router-dom'
import DeleteButton from '../components/DeleteButton';

const SavedResults: React.FC = (): JSX.Element => {
    let savedResults = useSelector(selectAllArticles);
    return (
        <div><></>
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
                        id={result.id}
                        >
                            <DeleteButton id={result.id}/>
                        </Card>
                  })
            }
        </div>

    )
}

export default SavedResults;
import { useEffect, useState, useRef, SetStateAction } from 'react'
import { searchWeb } from './adapters/webSearch'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom';
import { AxiosResponse } from 'axios'
import Card from './components/Card';
import Title from './components/Title';
import SideBar from './components/SideBar'
import ActionButton from './components/ActionButton';
import { getQuery, getUrl } from './features/articles/searchSlice';
import { addKeyword, IQueryData } from './features/history/historySlice';
import magnifySVG from './images/magnify-glass.svg';
import SavedResults from './pages/SavedResults';
import PinnedQueries from './pages/PinnedQueries';
import SaveButton from './components/SaveButton';
import { parseISO } from 'date-fns/esm';


const App: React.FC = () => {
  
  const [responseData, setResponseData] = useState<any>([]);
  const sideBarRef = useRef<HTMLElement>(null);
  const subMenuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const searchWord = useSelector(getQuery);
  const searchType = useSelector(getUrl);

  useEffect(() => {
    if (searchWord !== "") {
      (async () => {
        let response: AxiosResponse<any> = await searchWeb(searchWord, searchType)
        const date = new Date().toString();
        const reducer: IQueryData = {
          searchWord: searchWord,
          date: date,
          searchType: searchType
        }
        dispatch(addKeyword(reducer))
        
        setResponseData(response.data.value)
      }
      )()
    }
  }, [searchWord, searchType, dispatch])

  const renderCards = () => {
    if (responseData !== "") {
      console.log(responseData)
      return responseData.map((result: any) => {
        let placeholder = "";
        result.image.url === "" ? placeholder = magnifySVG : placeholder = result.image.url;
        return <Card 
          image={placeholder} 
          title={result.title} 
          stub={result.snippet} 
          publishDate={result.datePublished} 
          url={result.url} 
          id={result.id}
          children={<SaveButton resultData={result}/>}/>
      })
    } else {
      return (
        <h5>Search results are shown here.</h5>
      )
    }
  }

  return (
    <div>
      <Title menuRef={sideBarRef} />
      <div className='content-container'>
        <Switch>
          <Route path="/" exact>
            {
              responseData !== "" && renderCards()
            }
          </Route>
          <Route path="/SavedResults" component={SavedResults}/>
          <Route path="/SearchHistory" component={PinnedQueries}/>

        </Switch>
        <SideBar menuRef={sideBarRef} />
        <ActionButton subMenu={subMenuRef}  />
      </div>
    </div>
  );
}

export default App;

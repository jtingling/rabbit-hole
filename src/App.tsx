import { useEffect, useState, useRef  } from 'react'
import { searchWeb } from './adapters/webSearch'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom';
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
import _ from 'lodash'


const App: React.FC = () => {

  const [responseData, setResponseData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [ error, setError ] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1)
  const sideBarRef = useRef<HTMLElement>(null);
  const subMenuRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<any>(null);
  const loadingRef = useRef<any>(null);
  const dispatch = useDispatch();
  const searchWord = useSelector(getQuery);
  const searchType = useSelector(getUrl);

  const displayRef = {display: isLoading ? "block" : "none"}


  useEffect(()=>{
    window.onscroll = _.debounce(async()=>{
      let page = pageNumber
      if (error || isLoading) return;
      console.log(page);
      console.log(Math.round(window.innerHeight), Math.round(document.documentElement.scrollTop), document.documentElement.offsetHeight)
      if (Math.round((window.innerHeight + document.documentElement.scrollTop) - 40) >= document.documentElement.offsetHeight) { //nav has fixed position and must be subtracted for equality
        page++
        console.log("match")
        try {
          setIsLoading(true);
          let response: any = await searchWeb(searchWord, searchType, page);
          setResponseData([...responseData, ...response.data.value])
          setPageNumber(page);
          setIsLoading(false)
        } catch (e) {
          setError(true);
          console.log(e);
        }
      }
    }, 1000)
  })



  useEffect(() => {
    const loadData = async () => {
      if (searchWord !== "") {
        try {
          setIsLoading(true);
          let response: any = await searchWeb(searchWord, searchType);
          const date = new Date().toString();
          const reducer: IQueryData = {
            searchWord: searchWord,
            date: date,
            searchType: searchType
          }
          dispatch(addKeyword(reducer))
          setResponseData(response.data.value)
          setIsLoading(false)
        } catch (e) {
          setError(true);
          console.log(e);
        }
      }
    }  
    loadData();
    setError(false);
    setPageNumber(1);
    window.scrollTo(0,0);
  }, [searchWord, searchType, dispatch])

  const renderCards = () => {
    let articles;
    if (responseData.length > 0) {
      console.log(responseData)
      articles = responseData.map((result: any) => {
        let placeholder = "";
        result.image.url === "" ? placeholder = magnifySVG : placeholder = result.image.url;
        return <Card
          image={placeholder}
          title={result.title}
          stub={result.snippet}
          publishDate={result.datePublished}
          url={result.url}
          id={result.id}
          children={<SaveButton resultData={result} />} />
      })

    } else {
      return (
        <h5>Search results are shown here.</h5>
      )
    }
    return articles;
  }

  return (
    <div>
      <Title menuRef={sideBarRef} />
      <div className='content-container'>
        <Switch>
          <Route path="/" exact>
            <div className='card-container' ref={cardContainerRef}>
              {renderCards()}
            </div>
            <div ref={loadingRef} className="loading">
              <span style={displayRef}>Loading...</span>
            </div>
          </Route>
          <Route path="/SavedResults" component={SavedResults} />
          <Route path="/SearchHistory" component={PinnedQueries} />

        </Switch>
        <SideBar menuRef={sideBarRef} />
        <ActionButton subMenu={subMenuRef} />
      </div>
    </div>
  );
}

export default App;

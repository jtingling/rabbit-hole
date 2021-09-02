
import { useEffect, useState, useRef } from 'react'
import { searchWeb } from './adapters/webSearch'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom';
import _ from 'lodash'

import Card from './components/Card';
import Title from './components/Title';
import SideBar from './components/SideBar'
import ActionButton from './components/ActionButton';

import { getQuery, getUrl } from './features/articles/searchSlice';
import { addKeyword, IQueryData } from './features/history/historySlice';
import { addId, addArticle } from './features/articles/articleSlice';

import magnifySVG from './images/magnify-glass.svg';
import SavedResults from './pages/SavedResults';
import PinnedQueries from './pages/PinnedQueries';
import SaveButton from './components/SaveButton';

import Authorization from './components/Authorisation';
import { loadGoogleScript } from './scripts/googleAuth';

declare const window: any;

const App: React.FC = () => {

  const [responseData, setResponseData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [gapi, setGapi] = useState<any>(null);
  const [ db, setDb ] = useState<any>(null);
  const [ userId, setUserId ] = useState<any>(null);

  const sideBarRef = useRef<HTMLElement>(null);
  const signInWindowRef = useRef<HTMLDivElement>(null);
  const loginRef = useRef<HTMLButtonElement>(null);
  const logoutRef = useRef<HTMLButtonElement>(null)
  const subMenuRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<any>(null);
  const loadingRef = useRef<any>(null);

  const dispatch = useDispatch();
  const searchWord = useSelector(getQuery);
  const searchType = useSelector(getUrl);

  const displayRef = { display: isLoading ? "block" : "none" }

  useEffect(()=>{
    const dbName = 'articles';
    let db: any;
    let request = window.indexedDB.open(dbName, 1);
    request.onerror = (event: any) => console.error("There has been an error: " + event)
    request.onupgradeneeded = (event: any) => {
      db = event.target.result;
      console.log(db);
      setDb(db);
      console.log("DB initialized.")
      let objectStore = db.createObjectStore('users', { autoIncrement: true})
      objectStore.createIndex("articleId", 'articleId', {unique: false })
    }
    request.onsuccess = (event: any) => {
      db = event.target.result;
      setDb(db);
      console.log("DB initialized")
    }
  },[])

  useEffect(()=>{
    if (!!userId) {
      let result = db.transaction('users', 'readonly').objectStore('users').getAll();
      result.onerror = (e: any) => console.error("Failed to get articles: " + e);
      result.onsuccess = (event: any) => {
          event.target.result.map((record: any)=>{
              if (record.userId === userId) {
                  dispatch(addArticle(record));
              }
          })
      }
    }
  },[userId])

  useEffect(() => {
    function updateSigninStatus(isSignedIn: any) {
      if (loginRef.current !== null && logoutRef !== null) {
        if (isSignedIn) {
          loginRef.current.style.display = 'none';
          makeApiCall();
        } else {
          loginRef.current.style.display = 'block';
        }
      }
    }

    function makeApiCall() {
      let gapi = window.gapi;
      let id;
      gapi.client.people.people.get({
        'resourceName': 'people/me',
        'personFields': 'clientData'
      }).then((response: any) => {
        id = response.result.resourceName.split('/')[1];
        dispatch(addId(id))
        setUserId(id);
      })
    }

    function handleAuthClick(event: any) {
      let gapi = window.gapi;
      gapi.auth2.getAuthInstance().signIn();
    }

    function handleSignoutClick(event: any) {
      let gapi = window.gapi;
      gapi.auth2.getAuthInstance().signOut();
    }

    window.onGoogleScriptLoad = () => {
      const gapi = window.gapi;
      setGapi(gapi);
      async function initClient() {
        if (gapi !== null) {
          try {
            gapi.client.init({
              'apiKey': process.env.REACT_APP_GOOGLE_API,
              'clientId': process.env.REACT_APP_GOOGLE_CLIEND_ID,
              'discoveryDocs': ["https://people.googleapis.com/$discovery/rest?version=v1"],
              'scope': 'profile',
            }).then(() => {
              gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
              updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
              if (loginRef.current !== null && logoutRef.current !== null) {
                loginRef.current.onclick = handleAuthClick;
                logoutRef.current.onclick = handleSignoutClick;
              }
            });
          } catch (e) {
            console.log(e)
          }
          console.log(gapi);
        } else {
          console.log("failed to initialize")
        }
      }
      gapi.load('client:auth2', initClient)
    };

    loadGoogleScript();

  }, [gapi, dispatch])


  useEffect(() => {
    window.onscroll = _.debounce(async () => {
      let page = pageNumber
      if (error || isLoading) return;
      console.log(Math.round(window.innerHeight), Math.round(document.documentElement.scrollTop), document.documentElement.offsetHeight)
      if (Math.round((window.innerHeight + document.documentElement.scrollTop) - 40) >= document.documentElement.offsetHeight) { //nav has fixed position and must be subtracted for equality
        page++
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
          setIsLoading(false);
        }
      }
    }
    loadData();
    setError(false);
    setPageNumber(1);
    window.scrollTo(0, 0);
  }, [searchWord, searchType, dispatch])

  const renderCards = () => {
    let articles;
    if (responseData.length > 0) {
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
          children={<SaveButton resultData={result} db={db} />} />
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
      <Title menuRef={sideBarRef} signInWindowRef={signInWindowRef} />
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
          <Route path="/SavedResults" render={()=> <SavedResults db={db}/>}  />
          <Route path="/SearchHistory" component={PinnedQueries} />

        </Switch>
        <SideBar menuRef={sideBarRef} />
        <ActionButton subMenu={subMenuRef} />
        <Authorization logoutRef={logoutRef} loginRef={loginRef} signInWindowRef={signInWindowRef} />
      </div>
    </div>
  )
}

export default App;
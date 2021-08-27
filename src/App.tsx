
import { useEffect, useState, useRef } from 'react'
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
import Authorization from './components/Authorisation';
import { loadGoogleScript } from './scripts/googleAuth';

declare const window: any;

const App: React.FC = () => {

  const [responseData, setResponseData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [gapi, setGapi] = useState<any>(null);
  const [googleAuth, setGoogleAuth] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');

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



  const onSuccess = (googleUser: any) => {
    setIsLoggedIn(true);
    const profile = googleUser.getBasicProfile();
    setName(profile.getName());
    setEmail(profile.getEmail());
    setImageUrl(profile.getImageUrl());
  };

  const onFailure = () => {
    setIsLoggedIn(false);
  }

  const renderSigninButton = (gapi: any) => {
    gapi.signin2.render('google-signin', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure
    });
  }

  const logOut = () => {
    (async () => {
      await googleAuth.signOut();
      setIsLoggedIn(false);
      renderSigninButton(gapi);
    })();
  };

  useEffect(() => {
    
    async function initClient() {      
      const googleAuth = await gapi.client.init({
        apiKey: "XXXX",
        client_id: "XXXX",
        'scope': 'profile',
      });
      console.log(googleAuth)
      googleAuth.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
      if (loginRef.current !== null && logoutRef.current !== null) {
        loginRef.current.onclick = handleAuthClick;
        logoutRef.current.onclick = handleSignoutClick;
      }
      console.log(gapi);
    }

    function updateSigninStatus(isSignedIn: any) {
      if (loginRef.current !== null && logoutRef !== null) {
        if (isSignedIn) {
          loginRef.current.style.display = 'none';
          loginRef.current.style.display = 'block';
          makeApiCall();
        } else {
          loginRef.current.style.display = 'block';
          loginRef.current.style.display = 'none';
        }
      }
    }

    function makeApiCall() {
      let gapi = window.gapi;
      gapi.client.people.people.get({
          'resourceName': 'people/me',
          'personFields': 'clientData'
      }).then((response: any) => {
          console.log(response.result);
      })
    }

    function handleAuthClick(event: any) {
      gapi.auth2.getAuthInstance().signIn();
    }
  
    function handleSignoutClick(event: any) {
      let gapi = window.gapi;
      gapi.auth2.getAuthInstance().signOut();
    }

    window.onGoogleScriptLoad = () => {
      const gapi = window.gapi;
      setGapi(gapi);
      console.log(gapi);
      gapi.load('client:auth2', initClient)
    };

    loadGoogleScript();

  }, [gapi])


  useEffect(() => {
    window.onscroll = _.debounce(async () => {
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
    window.scrollTo(0, 0);
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
      <Title menuRef={sideBarRef} loginRef={loginRef} loggedIn={isLoggedIn}  name={name} email={email} signInWindowRef={signInWindowRef} />
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
        <Authorization gapi={gapi} logoutRef={logoutRef} loginRef={loginRef} signInWindowRef={signInWindowRef} logOut={logOut} loggedIn={isLoggedIn} name={name} email={email} imageUrl={imageUrl} />
      </div>
    </div>
  );
}

export default App;

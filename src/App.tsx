import { useEffect, useState, useRef, SetStateAction } from 'react'
import { searchWeb } from './adapters/webSearch'
import { useDispatch, useSelector } from 'react-redux'
import { AxiosResponse } from 'axios'
import Card from './components/Card';
import Title from './components/Title';
import SideBar from './components/SideBar'
import ActionButton from './components/ActionButton';
import { getQuery, getUrl } from './features/articles/searchSlice';


const App: React.FC = () => {
  const [ responseData, setResponseData ] = useState<any>([]);
  const sideBarRef = useRef<HTMLElement>(null);
  const subMenuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const searchWord = useSelector(getQuery);
  const searchType = useSelector(getUrl);

  useEffect(()=>{
    if (searchWord !== "") {
      ( async () => {
        let response: AxiosResponse<any> = await searchWeb(searchWord, searchType)
        console.log(response.data.value)
        setResponseData(response.data.value)
      }
      )()
    }
  }, [searchWord, dispatch])

  const renderCards = () => {
    if (responseData !== "") {
      return responseData.map((result: any) => {
        return <Card image={responseData.url} title={result.title} subTitle={"result"} stub={result.description}/>
      })
    } else {
      return (
        <h5>Search results are shown here.</h5>
      )
    }
  }

  return (
    <div> {console.log(searchType, searchWord)}
      <Title menuRef={sideBarRef} />
      <div className='content-container'>
        {
          responseData !== "" && renderCards()
        }
        <SideBar menuRef={sideBarRef} />
        <ActionButton subMenu={subMenuRef} />
      </div>
    </div>
  );
}

export default App;

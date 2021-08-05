import {useEffect} from 'react'
import { searchWeb } from './adapters/webSearch'

function App() {
  useEffect(()=>{
    (async ()=>{
      let data = await searchWeb('Blizzard')
      console.log(data.data)
    })()
  },[])
  return (
    <div>

    </div>
  );
}

export default App;

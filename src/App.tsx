import { useEffect, useState, useRef } from 'react'
import { searchWeb } from './adapters/webSearch'
import Card from './components/Card';
import Title from './components/Title';
import SideBar from './components/SideBar'

function App() {
  const [ isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false)
  const sideBarRef = useRef<HTMLElement>(null)


  return (
    <div>
      <Title menuRef={sideBarRef}/>
      <Card/>
      <SideBar menuRef={sideBarRef}/>
    </div>
  );
}

export default App;

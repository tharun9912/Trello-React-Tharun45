import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Show from './boards/Show'
import GetAllLists from './lists/GetAllLists'
import Headr from './Headr'

function App() {
    
  return (
    <div>
       <Headr/>
      <Routes>
        <Route path="/" element={<Show/>}/>
        <Route path="/board/:id" element={<GetAllLists/>}/>
      </Routes>
    </div>
  )
}

export default App

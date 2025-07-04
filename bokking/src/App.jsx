import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import List from './pages/list/List'
import Hotel from './pages/hotel/Hotel'

const App = () => {
  return (
    <>
      <Routes>
        <Route index element ={<Home />} />
        <Route path='/hotels' element ={<List />} />
        <Route path='/hotel/:id' element ={<Hotel />} />
      </Routes>
    </>
  )
}

export default App

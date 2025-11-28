import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeMain from '../components/HomeMain'
import BookDetails from '../components/BookDetails'
import Success from '../pages/Success'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeMain />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/success" element={<Success/>} />
      </Routes>
    </div>
  );
}

export default App

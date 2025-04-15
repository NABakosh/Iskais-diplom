import Home from './components/main/Home'
import Header from './components/main/Header'
import Discepline from './components/dis/Discepline'
import Book from './components/book/Book'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.scss'
function App() {

  return (
    <div className='App'>
      <Header></Header>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={`/discepline/:id`} element={<Discepline/>}/>
        <Route path='/book' element={<Book/>} />
      </Routes>
    </Router>
  </div>
  )
}

export default App

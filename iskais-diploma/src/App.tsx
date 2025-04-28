import Home from './components/main/Home'
import Header from './components/main/Header'
import Error from './components/main/Error'
import Discepline from './components/dis/Discepline'
import Book from './components/book/Book'
import Auth from './components/auth/Auth'
import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

import './App.scss'

function App() {
	const [books, setBooks] = useState([])
	const [search, setSearch] = useState('')

	useEffect(() => {
		axios
			.get('http://localhost:5001/books') // берём сразу всё
			.then(res => {
				setBooks(res.data)
				console.log(res.data) // Логируем здесь, чтобы увидеть полученные данные
			})
			.catch(err => console.error('Ошибка при загрузке книг:', err))
	}, [])
	console.log(books)
	return (
		<div className='App'>
			<Header books={books} search={search} setSearch={setSearch} />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/discepline/:id' element={<Discepline />} />
				<Route path='/discepline/:id/book/:bookId' element={<Book />} />
				<Route path='/auth' element={<Auth />} />
				<Route path='/*' element={<Error />} />
			</Routes>
		</div>
	)
}

export default App

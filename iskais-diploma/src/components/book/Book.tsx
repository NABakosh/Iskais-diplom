import { Link, useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

import './scss/book.scss'
const Book = () => {
	const location = useLocation()
	const { bookId } = useParams()
	const texts = [
		'ВТиПО',
		'Гостиничное бизнес',
		'Маркетинг',
		'Образование',
		'Правоведение',
		'Саморазвитие',
		'Стандартизация',
		'Технология',
		'Учёт и аудит',
		'Хлебопекарное, макаронное и кондитерское производство',
	]
	const [book, setBook] = useState(null)
	const [books, setBooks] = useState(null)
	console.log('test')
	useEffect(() => {
		axios
			.get(`http://localhost:5001${location.pathname}`)
			.then(res => setBook(res.data))
			.catch(err => console.error('errorrr', err))

		axios
			.get(
				`http://localhost:5001/discepline/${location.pathname.slice(12, 13)}`
			)
			.then(res => {
				const data =
					Array.isArray(res.data) && Array.isArray(res.data[0])
						? res.data[0]
						: res.data

				// 🎲 Перемешиваем массив случайным образом
				const shuffled = [...data].sort(() => Math.random() - 0.5)

				// 📚 Берём только первые 7
				const randomSeven = shuffled.slice(0, 5)

				setBooks(randomSeven)
			})
			.catch(err => console.error('Ошибка при загрузке книг:', err))
	}, [bookId])

	if (!book) return <div>Загрузка...</div>

	return (
		<div className='book'>
			<div className='book-center'>
				<article>
					<img width={300} src={`http://localhost:5001${book.preview_path}`} />
				</article>
				<main>
					<div className='book_info'>
						<div className='book_info_static active'>
							Название: {book.title}
							<p></p>
						</div>
						<div className='book_info_static'>
							ID книги: {book.id} <p></p>
						</div>
						<div className='book_info_static active'>
							Профиль: <p>{texts[location.pathname.slice(12, 13)]}</p>
						</div>
					</div>
					<div className='book_buttons'>
						<button
							onClick={() => {
								const link = document.createElement('a')
								link.href = `http://localhost:5001${book.file_path}`
								link.download = ''
								link.click()
							}}
						>
							Читать/Скачать PDF
						</button>
					</div>
				</main>
				<div className='other_books'>
					<div className='this_books'>
						<p>Другие книги по этой дисциплине</p>
						<ul>
							{books?.map((obj, i) => (
								<Link
									to={`/discepline/${location.pathname.slice(12, 13)}/book/${
										obj.id
									}`}
								>
									<li key={obj.id}>{obj.title}</li>
								</Link>
							))}
						</ul>
					</div>
					<div className='other_dis_books'>
						<p>Другие дисциплины</p>
						<ul>
							{texts.map((obj, i) => (
								<Link to={`/discepline/${i}`} key={i}>
									<li>{obj}</li>
								</Link>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Book

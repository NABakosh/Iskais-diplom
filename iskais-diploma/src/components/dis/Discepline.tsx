import { Link, useLocation, useNavigate } from 'react-router-dom'
import Card from './Card'
import axios from 'axios'
import './scss/discepline.scss'
import { useEffect, useState } from 'react'
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

const Discepline = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const [books, setBooks] = useState([])
	const currentLocationId = location.pathname.slice(-1)
	useEffect(() => {
		axios
			.get(`http://localhost:5001${location.pathname}`)
			.then(res => {
				// Проверка и распаковка если массив вложенный
				const data =
					Array.isArray(res.data) && Array.isArray(res.data[0])
						? res.data[0]
						: res.data
				setBooks(data)
			})
			.catch(err => console.error('Ошибка при загрузке книг:', err))
	}, [location.pathname])
	if (!books || books.length == 0) {
		return (
			<main className='discepline-main'>
				<div className='no_books'>
					<h1>
						К сожалению в данный момент по этой дисциплине нет доступных книг
					</h1>
					<button onClick={() => navigate(-1)}>Вернуться назад</button>
				</div>
			</main>
		)
	}
	return (
		<div className='discepline'>
			<h1>Выбор Книги</h1>
			<p>По дисциплине:{texts[currentLocationId]}</p>
			<article>
				{books.map((obj, i) => (
					<Link to={`/discepline/${currentLocationId}/book/${obj.id}`} key={i}>
						<Card text={obj.title} id={obj.id} url={obj.preview_path} />
					</Link>
				))}
			</article>
		</div>
	)
}

export default Discepline

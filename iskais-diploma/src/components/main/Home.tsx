import { Link } from 'react-router-dom'
import Card from './Card'
import './scss/home.scss'

const images = [
	{
		text: 'ВТиПО',
		url: '/main/VTiPO.png',
		alt: 'втипо',
	},
	{
		text: 'Гостиничное бизнес',
		url: '/main/Hotel.png',
		alt: 'гостиничный_бизнес',
	},
	{
		text: 'Маркетинг',
		url: '/main/Marketing.png',
		alt: 'маркетинг',
	},
	{
		text: 'Образование',
		url: '/main/School.png',
		alt: 'общее_образовательные_дисципл',
	},
	{
		text: 'Правоведение',
		url: '/main/Rules.png',
		alt: 'правоведение',
	},
	{
		text: 'Саморазвитие',
		url: '/main/Self.png',
		alt: 'саморазвитие',
	},
	{
		text: 'Стандартизация',
		url: '/main/ISO.png',
		alt: 'стандартизация',
	},
	{
		text: 'Технология',
		url: '/main/Tech.png',
		alt: 'технология',
	},
	{
		text: 'Учёт и аудит',
		url: '/main/count.png',
		alt: 'уч_т_и_аудит',
	},
	{
		text: 'Хлебопекарное, макаронное и кондитерское производство',
		url: '/main/bread.png',
		alt: 'хлебопекарное_макаронное_и_кон',
	},
]

const Home = () => {
	return (
		<main className='home'>
			<h1>Выбор дисциплины</h1>
			<article>
				{images.map((obj, i) => (
					<Link to={`/discepline/${i}`} key={i}>
						<Card text={obj.text} alt={obj.alt} url={obj.url} i={i} />
					</Link>
				))}
			</article>
		</main>
	)
}
export default Home

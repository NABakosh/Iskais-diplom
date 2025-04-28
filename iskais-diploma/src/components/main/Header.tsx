import logo from './logo.png'
import userimg from './guy.svg'

import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import './scss/header.scss'
import { useState, useRef, useEffect, useMemo } from 'react'

const Header = ({ books, search, setSearch }) => {
	console.log(books)

	const { user, logout } = useAuth()
	const navigate = useNavigate()

	// два состояния: поиск и меню пользователя
	const [showSearchDropdown, setShowSearchDropdown] = useState(false)
	const [showUserDropdown, setShowUserDropdown] = useState(false)

	// рефы, чтобы клик вне закрывал дропдауны
	const searchRef = useRef(null)
	const userRef = useRef(null)

	// плоский массив всех книг
	const allBooks = useMemo(
		() =>
			books?.flatMap(
				group =>
					group.books?.map(book => ({
						...book,
						discipline: group.discipline,
						disId: group.disId,
					})) || [] // Если group.books не существует, возвращаем пустой массив
			) || [], // Если books вообще нет, возвращаем пустой массив
		[books]
	)

	// отфильтрованные варианты (максимум 5)
	const filteredBooks = useMemo(() => {
		if (!search) return []

		const lower = search.toLowerCase()

		// Фильтруем книги по названию
		return allBooks
			.filter(book => book.title && book.title.toLowerCase().includes(lower)) // Проверка на наличие title
			.slice(0, 5) // Ограничиваем до 5 книг
	}, [search, allBooks])

	// Клик вне — закрываем оба дропа
	useEffect(() => {
		const handleClickOutside = e => {
			if (searchRef.current && !searchRef.current.contains(e.target)) {
				setShowSearchDropdown(false)
			}
			if (userRef.current && !userRef.current.contains(e.target)) {
				setShowUserDropdown(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const onSearchChange = e => {
		setSearch(e.target.value)
		setShowSearchDropdown(!!e.target.value)
	}

	const onSearchKey = e => {
		if (e.key === 'Enter' && filteredBooks.length) {
			navigate('/book', { state: { book: filteredBooks[0] } })
			setShowSearchDropdown(false)
		}
	}

	const pickBook = book => {
		setSearch(book.title) // Используем title вместо name
		setShowSearchDropdown(false)
	}

	return (
		<div className='header'>
			<nav className='nav'>
				<Link to='/' className='logo'>
					<img src={logo} alt='logo' />
					<p>
						Almaty Technological-
						<br />
						Finance and Innovation-
						<br />
						Technical College
					</p>
				</Link>

				<div className='search-container' ref={searchRef}>
					<input
						type='text'
						value={search}
						onChange={onSearchChange}
						onKeyDown={onSearchKey}
						onFocus={() => search && setShowSearchDropdown(true)}
						placeholder='Поиск книги...'
					/>
					{showSearchDropdown && (
						<ul className='search-dropdown'>
							{filteredBooks.length ? (
								filteredBooks.slice(0, 4).map((b, i) => (
									<Link to={`discepline/${b.disId}/book/${b.id}`}>
										<li key={i} onClick={() => pickBook(b)}>
											{b.title} {console.log(b)}
										</li>
									</Link>
								))
							) : (
								<li className='no-match'>Ничего не найдено</li>
							)}
						</ul>
					)}
				</div>

				{user ? (
					<div className='user-container' ref={userRef}>
						<img
							src={userimg}
							alt='user'
							className='avatar'
							onClick={() => setShowUserDropdown(v => !v)}
							width={30}
						/>
						<div
							className={`user-dropdown ${
								showUserDropdown ? 'user-dropdown-active' : ''
							}`}
						>
							<p onClick={logout}>Выйти</p>
						</div>
					</div>
				) : (
					<Link to='/auth'>
						<button className='login-btn'>Войти</button>
					</Link>
				)}
			</nav>
		</div>
	)
}

export default Header

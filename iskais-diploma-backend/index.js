// server.js
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('./db')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5001

// Массив с названиями таблиц для разных дисциплин
const altList = [
	'втипо',
	'гостиничный_бизнес',
	'маркетинг',
	'общее_образовательные_дисципл',
	'правоведение',
	'саморазвитие',
	'стандартизация',
	'технология',
	'уч_т_и_аудит',
	'хлебопекарное_макаронное_и_кон',
]
app.use('/previews', cors(), express.static(path.join(__dirname, 'previews')))
app.use('/AFPITK', cors(), express.static(path.join(__dirname, 'AFPITK')))

// Очистка имени таблицы от лишних символов (на будущее)
function sanitizeTableName(name) {
	return (
		'books_' +
		name
			.toLowerCase()
			.replace(/[^a-zA-Zа-яА-Я0-9]/g, '_')
			.replace(/_+/g, '_')
			.replace(/^_+|_+$/g, '')
	)
}

// Middlewares
app.use(cors({ origin: 'http://localhost:5173' })) // Разрешаем только фронтенд с этого адреса
app.use(express.json()) // Для работы с JSON в запросах

// 🧾 Регистрация
app.post('/register', async (req, res) => {
	try {
		const { email, password } = req.body
		if (!email || !password) {
			return res.status(400).json({ error: 'Email и пароль обязательны' })
		}

		const hashed = await bcrypt.hash(password, 10)
		await db.query('INSERT INTO users (email, password) VALUES ($1, $2)', [
			email,
			hashed,
		])

		res.status(201).json({ message: 'Пользователь зарегистрирован' })
	} catch (err) {
		console.error('Регистрация — ошибка:', err)
		res.status(500).json({ error: 'Ошибка на сервере' })
	}
})

// 🔐 Логин
app.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body
		const result = await db.query('SELECT * FROM users WHERE email = $1', [
			email,
		])
		if (!result.rows.length) {
			return res.status(400).json({ error: 'Пользователь не найден' })
		}

		const user = result.rows[0]
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res.status(400).json({ error: 'Неверный пароль' })
		}

		const token = jwt.sign(
			{ id: user.id },
			process.env.JWT_SECRET || 'SECRET_KEY'
		)
		res.json({ message: 'Вход успешен', token })
	} catch (err) {
		console.error('Логин — ошибка:', err)
		res.status(500).json({ error: 'Ошибка на сервере' })
	}
})

// 📚 Получить книги по ID дисциплины
app.get('/discepline/:id', async (req, res) => {
	const disciplineId = parseInt(req.params.id)
	if (
		isNaN(disciplineId) ||
		disciplineId < 0 ||
		disciplineId >= altList.length
	) {
		return res.status(400).json({ error: 'Неверный ID дисциплины' })
	}

	try {
		const query = await db.query(
			`SELECT id, title, preview_path FROM books_${altList[disciplineId]}`
		)
		const books = query.rows.map(book => ({
			...book,
			preview_path: book.preview_path
				.replace(/^.*public[\\/]/, '/')
				.replace(/\\/g, '/'),
		}))
		console.log(books)
		res.json(books)
	} catch (err) {
		console.error('Ошибка при получении книг по дисциплине:', err)
		res.status(500).json({ error: 'Ошибка сервера' })
	}
})

// 📖 Получить все книги по всем дисциплинам
app.get('/books', async (req, res) => {
	const result = []
	try {
		for (let i = 0; i < altList.length; i++) {
			const tableName = altList[i]
			const response = await db.query(`SELECT * FROM books_${tableName}`)
			result.push({
				discipline: tableName,
				books: response.rows,
				disId: i,
			})
		}
		res.json(result)
	} catch (err) {
		console.error('❌ Ошибка при получении книг:', err)
		res.status(500).json({ error: 'Ошибка на сервере' })
	}
})
app.get('/discepline/:disciplineId/book/:bookId', async (req, res) => {
	const disciplineId = parseInt(req.params.disciplineId)
	const bookId = parseInt(req.params.bookId)
	try {
		const request = await db.query(
			`SELECT * FROM books_${altList[disciplineId]} WHERE id = $1`,
			[bookId]
		)
		console.log(request.rows[0])
		res.json(request.rows[0])
	} catch (err) {
		console.error('test')
	}
})
// 🔊 Запуск сервера
app.listen(PORT, () => console.log(`🚀 API запущено: http://localhost:${PORT}`))

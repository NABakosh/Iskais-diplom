const fs = require('fs')
const path = require('path')
const { Client } = require('pg')

// Настройки PostgreSQL
const client = new Client({
	user: 'postgres',
	host: 'localhost',
	database: 'library',
	password: 'root',
	port: 5432,
})

const BASE_DIR = path.join(__dirname, '/AFPITK')
const BASE_DIR_PRE = path.join(__dirname, '/previews')

const MAX_FILES = 400

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

;(async () => {
	await client.connect()
	let counter = 0

	const disciplines = fs.readdirSync(BASE_DIR)

	for (const disciplineName of disciplines) {
		const disciplinePath = path.join(BASE_DIR, disciplineName)
		if (!fs.lstatSync(disciplinePath).isDirectory()) continue

		const tableName = sanitizeTableName(disciplineName)

		// Удалить старую таблицу, если есть
		await client.query(`DROP TABLE IF EXISTS ${tableName}`)

		// Создать новую таблицу
		await client.query(`
		CREATE TABLE ${tableName} (
		  id SERIAL PRIMARY KEY,
		  title VARCHAR(255) NOT NULL,
		  author VARCHAR(255),
		  file_path TEXT NOT NULL,
		  preview_path TEXT NOT NULL
		)
		`)

		const files = fs.readdirSync(disciplinePath)
		for (const file of files) {
			if (!file.toLowerCase().endsWith('.pdf')) continue

			// Преобразуем путь к файлу с использованием прямых слэшей
			const relativePath = path.posix.join('/AFPITK', disciplineName, file)
			const title = file
				.replace(/\.pdf$/i, '')
				.replace(/_/g, ' ')
				.trim()

			// Формируем путь к превью
			const previewFile = file.replace(/\.pdf$/i, '.jpg')
			const previewFullPath = path.join(
				BASE_DIR_PRE,
				disciplineName,
				previewFile
			)
			// Проверяем, есть ли файл превью
			if (!fs.existsSync(previewFullPath)) {
				console.warn(`⚠️ Превью не найдено для "${title}". Пропуск.`)
				continue
			}

			// Преобразуем путь к превью с использованием прямых слэшей
			const previewRelPath = path.posix.join(
				'/previews',
				disciplineName,
				previewFile
			)

			// Вставляем данные в таблицу только если превью существует
			await client.query(
				`INSERT INTO ${tableName} (title, author, file_path, preview_path) VALUES ($1, $2, $3, $4)`,
				[title, null, relativePath, previewRelPath]
			)

			console.log(`[✅] ${file} -> ${tableName} | "${title}"`)
			counter++
			if (counter >= MAX_FILES) break
		}

		if (counter >= MAX_FILES) break
	}

	await client.end()
	console.log(`\n[🏁] Импорт завершён. Загружено файлов: ${counter}`)
})()

const { Pool } = require('pg')

const pool = new Pool({
	user: 'postgres', // твой юзер от PostgreSQL
	password: 'root', // твой пароль
	host: 'localhost', // адрес сервера БД
	port: 5432, // порт PostgreSQL (по умолчанию 5432)
	database: 'library', // имя твоей базы данных
})

module.exports = pool

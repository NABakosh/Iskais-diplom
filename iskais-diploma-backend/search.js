const fs = require('fs')
const path = require('path')

// Путь к корневой папке с превью
const previewsRoot = path.join(__dirname, 'previews')

/**
 * Рекурсивно обходит директорию и возвращает список всех файлов
 * @param {string} dir
 * @returns {string[]} массив путей к файлам
 */
function getAllFiles(dir) {
	let results = []
	const list = fs.readdirSync(dir)
	list.forEach(file => {
		const fullPath = path.join(dir, file)
		const stat = fs.statSync(fullPath)
		if (stat && stat.isDirectory()) {
			results = results.concat(getAllFiles(fullPath))
		} else {
			results.push(fullPath)
		}
	})
	return results
}

/**
 * Убирает числовой суффикс (например, -1 или -001) перед расширением .jpg
 * @param {string} filename
 * @returns {string} новое имя файла
 */
function stripSuffix(filename) {
	return filename.replace(/-(?:\d+)\.jpg$/i, '.jpg')
}

;(async () => {
	try {
		const allFiles = getAllFiles(previewsRoot)
		for (const filePath of allFiles) {
			// Работаем только с .jpg файлами
			if (!filePath.toLowerCase().endsWith('.jpg')) continue

			const dir = path.dirname(filePath)
			const base = path.basename(filePath)
			const newBase = stripSuffix(base)

			if (newBase !== base) {
				const newPath = path.join(dir, newBase)
				// Если файл с новым именем уже существует, пропускаем
				if (fs.existsSync(newPath)) {
					console.warn(`Пропущено: ${newBase} уже существует`)
					continue
				}
				fs.renameSync(filePath, newPath)
				console.log(`Переименовано: ${base} -> ${newBase}`)
			}
		}
		console.log('Готово: все суффиксы удалены.')
	} catch (err) {
		console.error('Ошибка при удалении суффиксов:', err)
	}
})()

const fs = require('fs')
const path = require('path')
const { convert } = require('pdf-poppler')

const rootDir = path.join(__dirname, 'afpitk')

async function getAllPdfFiles(dir, fileList = []) {
	const files = fs.readdirSync(dir)
	for (const file of files) {
		const fullPath = path.join(dir, file)
		const stat = fs.statSync(fullPath)
		if (stat.isDirectory()) {
			await getAllPdfFiles(fullPath, fileList)
		} else if (file.endsWith('.pdf')) {
			fileList.push(fullPath)
		}
	}
	return fileList
}

async function generatePreview(pdfPath) {
	const discipline = path.basename(path.dirname(pdfPath))
	const fileName = path.basename(pdfPath, '.pdf')
	const previewsDir = path.join(__dirname, 'previews', discipline)
	if (!fs.existsSync(previewsDir))
		fs.mkdirSync(previewsDir, { recursive: true })

	const opts = {
		format: 'jpeg',
		out_dir: previewsDir,
		out_prefix: fileName,
		page: 1,
	}

	try {
		await convert(pdfPath, opts)
		console.log(`✅ Превью для "${fileName}" создано`)
	} catch (err) {
		console.error(`❌ Ошибка для "${fileName}":`, err)
	}
}

async function run() {
	const pdfFiles = await getAllPdfFiles(rootDir)
	for (const pdf of pdfFiles) {
		await generatePreview(pdf)
	}
	console.log('🚀 Все превью сгенерированы')
}

run()

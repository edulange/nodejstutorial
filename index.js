const fs = require('fs')
const path = require('path')
const fsPromises = require('fs').promises

const fileOps = async () => {
	try {
		const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8')
		console.log('data :>> ', data)
		await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt')) //para deletar
		await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data)
		await fsPromises.appendFile(
			path.join(__dirname, 'files', 'promiseWrite.txt'),
			'LineBreak Nice to meet you.'
		)
		await fsPromises.rename(
			path.join(__dirname, 'files', 'promiseWrite.txt'),
			path.join(__dirname, 'files', 'promiseComplete.txt')
		)
		const newData = await fsPromises.readFile(
			path.join(__dirname, 'files', 'promiseComplete.txt'),
			'utf-8'
		)
		console.log('data :>> ', newData)
	} catch (err) {
		console.log('err :>> ', err)
	}
}

fileOps()

//exit on uncaught errors
process.on('uncaughtException', (err) => {
	console.log(`There was an uncaught error: ${err}`)
	process.exit(1)
})

/*
fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8', (err, data) => {
	if (err) throw err
	console.log('data', data)
	console.log('data.toString()', data.toString())
})

fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you', (err, data) => {
	if (err) throw err
	console.log('Write complete')

	fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), 'it came from appendFile', (err, data) => {
		if (err) throw err
		console.log('Append complete')

		fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt'),
			(err, data) => {
				if (err) throw err
				console.log('Rename complete')
			}
		)
	})
})
*/

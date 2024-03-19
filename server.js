const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3500

app.get('^/$|/index(.html)?', (req, res) => {
	//regex
	//res.sendFile('./views/index.html', { root: __dirname }) // com essa 'option' do {root:} eu estou falando para começar por: __dirname, que é o root
	res.sendFile(path.join(__dirname, 'views', 'index.html')) // funciona igual a forma de cima
})

app.get('/new-page(.html)?', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

app.get('/old-page(.html)?', (req, res) => {
	res.redirect(301, '/new-page.html') //302 by default
})

// Route Handler !!!!!!!

app.get(
	'/hello(.html)?',
	(req, res, next) => {
		console.log('attempted to load hello.html')
		next() // o next faz como exatamente diz o nome 'proximo'
		//nese caso foi tentado dar um get em hello, não conseguiu? NEXT FUNCTION
	},
	(req, res) => {
		res.send('hello world')
	}
)

//Chaining route handlers
const one = (req, res, next) => {
	console.log('one')
	next()
}
//Chaining route handlers
const two = (req, res, next) => {
	console.log('two')
	next()
}
//Chaining route handlers
const three = (req, res, next) => {
	console.log('three')
	res.send('finished')
}
app.get('/chain(.html)?', [one, two, three]) //funciona quase igual a middleware

app.get('/*', (req, res) => {
	// o * do '/*' significa tudo a partir do /
	res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

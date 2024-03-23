const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3500

//custom middleware logger // o logger precisa ficar cedo, pra começar a sempre dar log xD
app.use(logger)

//logo em seguida o cors
//no meu site em produção deve constar o meu dominio de vdd
const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3500/']
const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS, escrito pelo backend'))
		}
	},
	optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

//built-in middleware to handle urlencoded data
// in other words, form data:
//'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }))

//built-in middleware for json
app.use(express.json())

//serve static files
app.use(express.static(path.join(__dirname, '/public')))

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

// app.all não aceita regex
app.all('*', (req, res) => {
	res.status(404)
	if (req.accepts('html')) {
		res.sendFile(path.join(__dirname, 'views', '404.html'))
	} else if (req.accepts('json')) {
		res.json({ error: '404 not found, não encontrou o json' })
	} else {
		res.type('txt').send('404 not found, não encontrou o txt')
	}
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
https://youtu.be/f2EqECiTBL8?si=X7Mifl7vRumm5VVo&t=10717
cansadito




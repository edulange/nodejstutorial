const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3500

//custom middleware logger // o logger precisa ficar cedo, pra começar a sempre dar log xD
app.use(logger)

app.use(cors(corsOptions))

//built-in middleware to handle urlencoded data
// in other words, form data:
//'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }))

//built-in middleware for json
app.use(express.json())

//serve static files
app.use(express.static(path.join(__dirname, '/public')))

//routes
app.use('/', require('./routes/root'))
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/employees', require('./routes/api/employees'))

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

https://youtu.be/f2EqECiTBL8?si=jSFG6RCqLaQpJ7D0&t=14989

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


/* // Route Handler !!!!!!!

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
app.get('/chain(.html)?', [one, two, three]) //funciona quase igual a middleware */

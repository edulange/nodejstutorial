const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3500

app.get('^/$|/index.html', (req, res) => {
	//res.sendFile('./views/index.html', { root: __dirname }) // com essa 'option' do {root:} eu estou falando para começar por: __dirname, que é o root
	res.sendFile(path.join(__dirname, 'views', 'index.html')) // funciona igual a forma de cima
})

app.get('/new-page.html', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'new-page.html')) // funciona igual a forma de cima
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

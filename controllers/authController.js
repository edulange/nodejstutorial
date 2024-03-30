const usersDB = {
	users: require('../model/users.json'),
	setUsers: function (data) {
		this.users = data
	},
}

const bcrytp = require('bcrypt')

const jwt = require('jsonwebtoken')
require('dotenv').config()
const fsPromises = require('fs').promises
const path = require('path')

const handleLogin = async (req, res) => {
	const { user, pwd } = req.body
	if (!user || !pwd)
		return res.status(400).json({ message: 'Username and password are required, do handleUser' })

	const foundUser = usersDB.users.find((person) => person.username === user) //para achar se tem um usuario no DB
	if (!foundUser) return res.sendStatus(401) //Unauthorized

	//evaluate password
	const match = await bcrytp.compare(pwd, foundUser.password)
	if (match) {
		//CRIANDO O JWT
		const acessToken = jwt.sign(
			{ username: foundUser.username }, 
			process.env.ACESS_TOKEN_SECRET, 
			{expiresIn: '30s',})
			
		const refreshToken = jwt.sign(
			{ username: foundUser.username }, 
			process.env.REFRESH_TOKEN_SECRET, 
			{expiresIn: '1d'})

		//Salvando refreshToken with current user in the DB
		const otherUsers = usersDB.users.filter((person) => person.username !== foundUser.username)
		const curretUser = { ...foundUser, refreshToken }
		usersDB.setUsers([...otherUsers, curretUser])
		await fsPromises.writeFile(
			path.join(__dirname, '..', 'model', 'users.json'),
			JSON.stringify(usersDB.users)
		)
		
		res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 *60 * 60 * 1000}) //1 dia
		res.json({ acessToken })
	} else {
		res.sendStatus(401)
	}
}

module.exports = { handleLogin }

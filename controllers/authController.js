const usersDB = {
	users: require('../model/users.json'),
	setUsers: function (data) {
		this.users = data
	},
}

const bcrytp = require('bcrypt')

const handleLogin = async (req, res) => {
	const { user, pwd } = req.body
	if (!user || !pwd)
		return res.status(400).json({ message: 'Username and password are required, do handleUser' })

	const foundUser = usersDB.users.find((person) => person.username === user) //para achar se tem um usuario no DB
	if (!foundUser) return res.sendStatus(401) //Unauthorized

	//evaluate password
	const match = await bcrytp.compare(pwd, foundUser.password)
	if (match) {
		//AQUI QUE VAI O JWT
		res.json({ message: `User ${user} is logged in!` })
	} else {
		res.sendStatus(401)
	}
}

module.exports = { handleLogin }

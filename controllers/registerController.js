const User = require('../model/User')
https://youtu.be/f2EqECiTBL8?si=6ulFqIGoGyX2FoDg&t=22527

const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
	const { user, pwd } = req.body
	if (!user || !pwd)
		return res.status(400).json({ message: 'Username and password are required, do handleUser' })

	//check for duplicate usernames in the db
	const duplicate = await User.findOne({ username: user }).exec()
	if (duplicate) return res.sendStatus(409) //conflit

	try {
		//encrypt the pwd
		const hashedPwd = await bcrypt.hash(pwd, 10)

		//create and store the new user
		const result = await User.create({
			username: user,
			password: hashedPwd,
		})

		console.log('veio do RegisterController -- result :>> ', result);

		res.status(201).json({ sucess: `new user ${user} created!` })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

module.exports = { handleNewUser }

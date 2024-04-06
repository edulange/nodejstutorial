const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//require('dotenv').config()  //isso pode ser requisitado apenas no server.js, não é necessário estar aqui

const handleLogin = async (req, res) => {
	const { user, pwd } = req.body
	if (!user || !pwd) return res.status(400).json({ message: 'Username and password are required.' })
	
	const foundUser = await User.findOne({ username: user }).exec()
	if (!foundUser) return res.sendStatus(401) //Unauthorized
	// evaluate password
	const match = await bcrypt.compare(pwd, foundUser.password)
	if (match) {
		const roles = Object.values(foundUser.roles)
		// create JWTs
		const accessToken = jwt.sign(
			{
				UserInfo: {
					username: foundUser.username,
					roles: roles,
				},
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '30s' }
		)
		const refreshToken = jwt.sign({ username: foundUser.username }, process.env.REFRESH_TOKEN_SECRET, {
			expiresIn: '1d',
		})

		// Saving refreshToken with current user
		foundUser.refreshToken = refreshToken
		const result = await foundUser.save()
		console.log('veio do authController: salvando o refreshtoken com o usuário atual: ', result)

		res.cookie('jwt', refreshToken, {
			httpOnly: true,
			sameSite: 'None',
			secure: true,
			maxAge: 24 * 60 * 60 * 1000,
		})
		res.json({ accessToken })
	} else {
		res.sendStatus(401)
	}
}

module.exports = { handleLogin }

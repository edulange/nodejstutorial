const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = (req, res, next) => {
	const authHeader = req.headers['authorization']
	if (!authHeader) return res.sendStatus(401) //unauthorized
	console.log('AUTH CONTROLLER: authHeader :>> ', authHeader) //tem q aparecer 'Bearer token'
	const token = authHeader.split(' ')[1]
	jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (err, decoded) => {
		if (err) return res.sendStatus(403) //forbideen //invalid token
		req.user = decoded.username
		next()
	})
}

https://youtu.be/f2EqECiTBL8?si=F2FVOjYQlB3ns9L6&t=16274
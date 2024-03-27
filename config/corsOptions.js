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

module.exports = corsOptions

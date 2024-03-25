const express = require('express')
const router = express.Router()
const path = require('path')
const data = {}
data.employees = require('../../data/employees.json')

router.route('/').get((req, res) => {
	res.json(data.employees)
}).post((req, res) => {

})

module.exports = router

https://youtu.be/f2EqECiTBL8?si=de0HzyAisKFB61g1&t=11763

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
})

module.exports = mongoose.model('Employee', employeeSchema)
// Mongoose automatically looks for the plural, 
//lowercased version of your model name
//for example, the model Tank is for the tanks collection in the database.
//Ou seja, 'Employee' is for employees collection in the database

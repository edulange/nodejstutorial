const data = {
	employees: require('../model/employees.json'),
	setEmployees: function (data) {
		this.employees = data
	},
}

const getAllEmployees = (req, res) => {
	res.json(data.employees)
}

const createNewEmployee = (req, res) => {
	const newEmployee = {
        id: data.employees?.length ? data.employees[data.employees.length - 1].id + 1 : 1,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
	}

	if (!newEmployee.firstname || !newEmployee.lastname) {
		return res.status(400).json({ message: 'First name and last names are required.' })
	}

    https://youtu.be/f2EqECiTBL8?si=WnLmdyrkcKPfgKGg&t=12967

    data.setEmployees([...data.employees, newEmployee])
    res.json(data.employees)
}

const updateEmployee = (req, res) => {
	res.json({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
	})
}

const deleteEmployee = (req, res) => {
	res.json({ id: req.body.id })
}

const getEmployee = (req, res) => {
	res.json({ id: req.params.id })
}

module.exports = {
	getAllEmployees,
	createNewEmployee,
	updateEmployee,
	deleteEmployee,
	getEmployee,
}

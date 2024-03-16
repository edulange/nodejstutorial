const os = require('os')
const path = require('path')

console.log(os.type())
console.log(os.version())
console.log(os.userInfo())

console.log(os.homedir())
console.log(__dirname)
console.log(__filename)

console.log(path.dirname(__dirname))
console.log(path.dirname(__filename))
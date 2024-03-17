const fs = require('fs')
const path = require('path')
//path.join(__dirname, 'files', 'lorem.txt') mesma coisa que ('./files/lorem.txt')


const rs = fs.createReadStream(path.join(__dirname, 'files', 'lorem.txt'), {encoding: 'utf-8'})

const ws = fs.createWriteStream('./files/new-lorem.txt')

/* mesma coisa que o rs.pipe
rs.on('data', (dataChunk) => {
    ws.write(dataChunk)
}) */

rs.pipe(ws)

/* para conseguir bumbar o node
precisa instalar npm i nodemon -D 
precisa adicionar no package.json
"scripts": {
    "start": "node newindex.js",
    "dev": "nodemon newinedx.js"
},
depois é só dar um npm run dev
 */
const { v4: uuid } = require('uuid')
const { format } = require('date-fns')

console.log(format(new Date(), 'ddMMyyyy/tHH:mm:ss'))

console.log(uuid())
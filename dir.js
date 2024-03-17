const fs = require('fs')

if (!fs.existsSync('./new')) {  //não existe o directory './new' ? então executa a function
    fs.mkdir('./new', (err) => {
        if (err) throw err
        console.log('directory created')
    })
}

if (fs.existsSync('./new')) {  
    fs.rmdir('./new', (err) => {
        if (err) throw err
        console.log('directory Removed')
    })
}

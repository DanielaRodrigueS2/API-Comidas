const fs = require('fs')

function evento(msg){
    const mensagem = `${new Date().toISOString}, mensagem gerada: ${msg}\n`
    fs.appendFile('logs.txt', mensagem, (erro) => {
        if (erro) console.log('Houve algum erro ao gravar esse log,' , erro)
    });
}

module.exports = { evento }
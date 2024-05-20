const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const path = require('path'); // Resolve os endereços de acordo com o sistema operacional

// Função assíncrona, no momento que a aplicação ela iniciar se o arquivo de banco de dados não existir, ele vai criar o arquivo do banco de dados para nós
async function sqliteConnection(){
    const database = await sqlite.open({
        // Configurações da minha conexão, primeiro: onde quero salvar o arquivo do banco de dados
                            // onde estou, volto uma pasta, criar o arquivo database.db
        filename: path.resolve(__dirname, "..", "database.db"),
        //qual é o drive de conexão que vou utilizar. o sqlite é responsável por conectar, o sqlite3 é o driver
        driver: sqlite3.Database
    });

    return database;
}

module.exports = sqliteConnection;

const path = require("path");
const multer = require("multer");
const crypto = require('crypto'); // Função já disponível para nós
// Constante que vai utilizar como configuração, utilizamos o padrão de caixa alta

// Pasta temporária
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

// Utilizar biblioteca chamada multer npm install multer

const MULTER = {
    storage: multer.diskStorage({ // Ele tem uma propriedade storage entre parenteses objeto das configurações
        destination: TMP_FOLDER,
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString("hex") // Garantia que cada usuário tenha um arquivo com nome único. Gera um randomBytes(10) convertendo para uma string em hexadecimal
            const fileName = `${fileHash}-${file.originalname}`; // Nome do arquivo, propriedade originalname é o nome do arquivo original

            return callback(null, fileName); 
        } // Nome do arquivo

    }) 

}

module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER
}
const fs = require('fs'); // Módulo do Node para trabalhar com manipulação de arquivos
const path = require('path');
const uploadConfig = require('../configs/upload');

class DiskStorage {
    // classe vai ter duas funções
    async saveFile(file){
        // Quando fizermos o upload da imagem, quando ela chegar, ela vai ficar na pasta temporária para o back-end decidir o que fazer. 
        // Quando tudo der certo, ele vai pegar da pasta temporário e jogar para a upload files
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        );

        return file;
    }

    async deleteFile(file){
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);
        
        try {
            await fs.promises.stat(filePath);
        } catch {
            return; // caso algo de errado
        }


        await fs.promises.unlink(filePath); // Função para deletar o arquivo 
    }
}


module.exports = DiskStorage;
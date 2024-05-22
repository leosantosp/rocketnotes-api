const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage'); // Importar o nosso DiskStorage para trabalhar com exclusão e armazenamento das fotos

class UserAvatarController {

    async update(request, response){
        const user_id = request.user.id; // Pegando direto do nosso middleware de autenticação que fornecerá essa informação no cabeçalho
        const avatarFilename = request.file.filename; // Vou pegar o nome do arquivo que o usuário fez o upload

        const diskStorage = new DiskStorage(); // Instânciando a classe


        // Agora preciso buscar os dados do usuário para então atualizar de fato o avatar dele. 
        const user = await knex('users').where({ id: user_id }).first(); // Pegar da tabela de usuários onde o id seja igual ao user_id que capturamos do cabeçalho

        // Se o usuário não existe
        if(!user){
            throw new AppError('Somente usuários autenticados podem mudar a foto de perfil', 401); // 401 não autorizado
        }

        // Se dentro do usuário, existe um avatar. 
        if(user.avatar){
            // Precisamos pegar a foto antiga e deletá-la para colocar a nova no lugar.
            await diskStorage.deleteFile(user.avatar);
        }

        // caso não exista, segue o código
        const filename = await diskStorage.saveFile(avatarFilename);
        user.avatar = filename;

        await knex("users").update(user).where({id: user_id}); // Realizar a atualização da imagem

        return response.json(user); // Retornar o usuário

    }

}

module.exports = UserAvatarController;
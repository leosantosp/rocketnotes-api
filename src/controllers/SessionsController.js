const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const { compare } = require('bcryptjs');
const authConfig = require('../configs/auth');
const { sign } = require('jsonwebtoken'); // metodo presente

class SessionsController{

    // Criar uma sessão
    // O controller sempre tem na arquitetura no máximo 5 métodos. 
    async create(request, response){
        const { email, password } = request.body;

        const user = await knex('users').where({email}).first();

        if(!user){
            throw new AppError('E-mail e/ou senha incorreta', 401);
        }

        const passwordMatched = await compare(password, user.password);

        // Se for falso, não bateu
        if(!passwordMatched){
            throw new AppError('E-mail e/ou senha incorreta', 401);
        }

        // Se passou por essas fases acima, significa que o usuário está correto, logo, vamos gerar um token para o usuário para ele usar como uma chave de autenticação
        // biblioteca é o json web token

        const { secret, expiresIn } = authConfig.jwt;
                        // objeto vazio, chave secreta, e um conteúdo que quero inserir no token
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        }); 

        return response.json({user, token});
    }

}

module.exports = SessionsController;
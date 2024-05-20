const { verify } = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const authConfig = require('../configs/auth');

// Um middleware sempre tem o next que é pra onde vai a requisição
function ensureAuthenticated(request, response, next){
    const authHeader = request.headers.authorization; // O token do usuário vai estar dentro do cabeçalho, dentro da props authorization

    // Se o token não existe
    if(!authHeader){
        throw new AppError('JWT Toekn não informado', 401); // Não tem JWT
    }

    // Vamos acessar através de um vetor lá dentro do header
    // O token é armazenado dessa forma: Bare
    // split
    const [, token] = authHeader.split(" "); 
    // "Bare xxxxxxxxx"

    try {
        // Tentar verificar se o token é válido
        // Crio um 'alias' para a propriedade 'sub' e começo a chamá-la de user_id
        // Verifica o token, e se ele bate com as configurações
        const { sub: user_id } = verify(token, authConfig.jwt.secret);

        request.user = {
            // Converte para um Number
            id: Number(user_id)
        };

        return next();
    } catch {
        throw new AppError('JWT Token inválido', 401); // JWT inválido
    }
}

module.exports = ensureAuthenticated;

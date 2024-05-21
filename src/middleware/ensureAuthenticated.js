/*
    Sempre que o usuário fazer uma requisição, nós queremos obter o token que tá ali e quem é esse usuário através do ID que está dentro do token.
    Vamos ter o middleware que vai interceptar as requisições e verificar o token que ele está utilizando. 
*/

const { verify } = require('jsonwebtoken'); // Este método disponível dentro do json web token
const AppError = require('../utils/AppError'); // Método para tratar exceções
const authConfig = require('../configs/auth'); // Trazer as configurações de autenticação

// Um middleware sempre tem o next que é pra onde vai a requisição
function ensureAuthenticated(request, response, next){
    // Obter o cabeçalho da requisição e lá dentro eu vou acessar o authorization
    // Aqui é onde estará o token do usuário
    const authHeader = request.headers.authorization; 
    

    // Se o token não existe
    if(!authHeader){
        throw new AppError('JWT Token não informado', 401); // Não tem JWT
    }

    // Vamos acessar através de um vetor o que está dentro do header
    // O token é armazenado dessa forma: Bearer + token 
    
    // split ele serve para pegar a string e separá e passa ela para um vetor, no caso, vamos passar o espaço, para que ele pegue o "Bearer" "token"
    const [, token] = authHeader.split(" "); 
    /* Como eu não me importo com o 'Bearer', eu posso simplesmente deixar vazio, já o outro que é nosso token, posso deixar uma variável para ele atribuir o token
    a esta variável */
    // "Bearer xxxxxxxxx"

    try {
        // Tentar verificar se o token é válido
        
        /**
         * Aqui, o verify() receberá nosso token capturado e o outro parâmetro é a nossa secret dentro das nossas configurações de autenticação. 
         * Esta função verify, nos retorna uma propriedade chamada "sub" que nada mais é do que o conteúdo dentro deste token que nós repassamos. 
         * que no nosso caso é o id do usuário, logo, eu desestruturo o nosso sub e crio um alias para ela atribuindo a uma variável chamada user_id
         */
        const { sub: user_id } = verify(token, authConfig.jwt.secret);

        /**
         * Dentro da minha requisição vou criar uma propriedade que ela não existe até o momento e vai surgir agora. 
         * VOu chamá-la de user e dentro dela, ela receberá uma propriedade id e ela receberá o user_id convertido para Number()
         */
        request.user = {
            // Converte para um Number
            id: Number(user_id)
        };

        return next(); // Chamar a função destino
        
    } catch {
        throw new AppError('JWT Token inválido', 401); // JWT inválido
    }
}

module.exports = ensureAuthenticated;

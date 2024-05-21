/* A responsabilidade de conhecer as rotas do usuário é desse arquivo */

//Só que o app ele não conhece, então vou importar o Router dentro do próprio express e vou criar uma constane de usersRoutes = ROuter() e inicializo ele

const { Router } = require('express');
const UsersController = require('../controllers/UsersController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');


const usersController = new UsersController();
const usersRoutes = Router();


// Create não irá precisar, pois neste momento ele está criando a conta, nem conta ele tem, então não tem o que autenticar
usersRoutes.post("/", usersController.create); 

//Atualizar o perfil, ele precisa estar autenticado
// "path", "middleware", "function"
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.delete("/:id", ensureAuthenticated, usersController.delete);

// Só que agora eu preciso de alguma forma preciso expor essas minhas rotas pro meu server.js, pois eu tirei as rotas de lá. ENtão preciso expor elas desta forma
module.exports = usersRoutes; 
//Estou exportando para quem quiser usar esse arquivo, poder utilizar




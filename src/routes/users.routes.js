/* A responsabilidade de conhecer as rotas do usuário é desse arquivo */

//Só que o app ele não conhece, então vou importar o Router dentro do próprio express e vou criar uma constane de usersRoutes = ROuter() e inicializo ele

const { Router } = require('express');
const UsersController = require('../controllers/UsersController');

const usersController = new UsersController();
const usersRoutes = Router();


usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.update);
usersRoutes.delete("/:id", usersController.delete);

// Só que agora eu preciso de alguma forma preciso expor essas minhas rotas pro meu server.js, pois eu tirei as rotas de lá. ENtão preciso expor elas desta forma
module.exports = usersRoutes; 
//Estou exportando para quem quiser usar esse arquivo, poder utilizar



